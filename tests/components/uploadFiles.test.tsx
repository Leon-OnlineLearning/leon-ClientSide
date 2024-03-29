import { setupServer } from "msw/node";
import { rest } from "msw";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { UploadFiles } from "../../components/add-content/addContent";
import axios from "axios";
import LocalStorageMock from "../mocks/LocalstorageMock";
import { formatWithValidation } from "next/dist/next-server/lib/utils";

const lsMock = new LocalStorageMock();

describe("upload files test suite", () => {
  let classNameCorrectlySent = false;
  let courseIdCorrectlySent = false;
  let filesCorrectlySent = false;
  let testFileIsSent = false;
  let professorIdSent = false;

  const server = setupServer(
    rest.post("/training/related/upload", (req, res, ctx) => {
      const form: any = req.body;
      classNameCorrectlySent = form.get("className") === "ClassName";
      courseIdCorrectlySent = form.get("courseId") === "courseId";
      const files = form.getAll("files");
      filesCorrectlySent =
        files[0].name === "important.pdf" &&
        files[1].name === "chucknorris.pdf";
      professorIdSent = form.get("professorId") === "12345";
      return res(ctx.json({ success: true, sessionId: "12345" }));
    }),
    rest.post("/testing", (req, res, ctx) => {
      const form: any = req.body;
      const files = form.getAll("file");

      testFileIsSent = files[0].name === "test.txt";
      return res(ctx.json({ success: true, sessionId: "12345" }));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const trainingFileUploader = async (
    courseId,
    files,
    professorId,
    className
  ) => {
    const formData = new FormData();
    formData.append("professorId", professorId);
    formData.append("className", className);
    formData.append("courseId", courseId);
    files.forEach((file) => {
      formData.append(`files`, file);
    });
    return await axios
      .post("/training/related/upload", formData)
      .then((resp) => resp.data)
      .catch((err) => console.error(err));
  };

  test("it should render valid related state", () => {
    render(
      <UploadFiles
        sessionStorage={lsMock}
        professorId={"12345"}
        related
        courseId="courseId"
        onSubmit={trainingFileUploader}
      />
    );
    expect(screen.getByText("Upload related content")).toBeVisible();
  });

  test("it should render valid related state", () => {
    render(
      <UploadFiles
        professorId="12345"
        sessionStorage={lsMock}
        courseId="courseId"
        onSubmit={trainingFileUploader}
      />
    );
    expect(screen.getByText("Upload non-related content")).toBeVisible();
  });

  test("it should upload files", async () => {
    render(
      <UploadFiles
        professorId="12345"
        sessionStorage={lsMock}
        courseId="courseId"
        related
        onSubmit={trainingFileUploader}
      />
    );
    const importantPdfFiles = [
      new File(["¯_(ツ)_/¯"], "important.pdf", {
        type: "application/pdf",
      }),
      new File(["(⌐□_□)"], "chucknorris.pdf", {
        type: "application/pdf",
      }),
    ];

    userEvent.upload(
      screen.getByTestId("training-related-upload-file"),
      importantPdfFiles
    );
    userEvent.type(
      screen.getByPlaceholderText("E.g. Dynamic programming"),
      "ClassName"
    );
    userEvent.click(screen.getByText("Add"));
    await waitFor(() => screen.getByTestId("training-upload-files-done"));

    expect(classNameCorrectlySent).toBeTruthy();
    expect(filesCorrectlySent).toBeTruthy();
    expect(courseIdCorrectlySent).toBeTruthy();
    expect(professorIdSent).toBeTruthy();
    expect(lsMock.getItem("sessionId")).toEqual("12345");
  });

  test("it should deal with tests correctly", async () => {
    render(
      <UploadFiles
        professorId="12345"
        courseId="courseId"
        sessionStorage={lsMock}
        onSubmit={async (courseId, files, _, sessionId) => {
          const form = new FormData();
          form.append("courseId", courseId);
          form.append("file", files[0]);
          form.append("sessionId", sessionId);
          return await axios.post("/testing", form).then((resp) => resp.data);
        }}
        testing
      />
    );
    expect(screen.getByText("Upload your testing file")).toBeVisible();
    const testingFile = new File(["hello world"], "test.txt", {
      type: "text/plain",
    });
    userEvent.upload(screen.getByTestId("testing-upload-file"), testingFile);
    userEvent.click(screen.getByText("Add"));
    await waitFor(() => screen.getByTestId("training-upload-files-done"));
    expect(testFileIsSent).toBeTruthy();
  });
});
