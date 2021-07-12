import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";
import ModelChecklist from "../../components/models-checklist/modelsCheckList";
import { screen } from "@testing-library/react";
import ModelClasses from "../../model/ModelClasses";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

describe("Model check list test suite", () => {
  let modelIdCorrect = false;
  let classesAreCorrect = true;
  const server = setupServer(
    rest.get("/models/:modelId/classes", (req, res, ctx) => {
      modelIdCorrect = req.params.modelId === "ModelId";
      return res(
        ctx.json([
          {
            id: "12345",
            name: "class 1",
          },
          {
            id: "12346",
            name: "class 2",
          },
        ])
      );
    }),
    rest.put("/models/:modelId/classes", (req, res, ctx) => {
      const classes: any = req.body;
      classes.forEach((_class) => {
        classesAreCorrect =
          classesAreCorrect &&
          (_class.name === "class 1" || _class.name === "class 2");
      });
      return res(ctx.json({ success: false }));
    })
  );
  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  const contentFetcher = async (modelId) => {
    return await axios
      .get(`/models/${modelId}/classes`)
      .then((resp) => resp.data as ModelClasses[]);
  };

  const retrainHandler = async (modelId: string, classes: ModelClasses[]) => {
    return await axios
      .put(`/models/${modelId}/classes`, classes)
      .then((resp) => resp.data);
  };

  const prepareView = async () => {
    await waitFor(() => screen.getByTestId("classes"));
  };

  const doneSendingClasses = async () => {
    await waitFor(() => screen.getByText("done"));
  };

  test("should get content from the server and display it", async () => {
    render(
      <ModelChecklist
        onRetrain={retrainHandler}
        contentFetcher={contentFetcher}
        modelId="ModelId"
      />
    );
    await prepareView();
    expect(screen.getByText("class 1")).toBeVisible();
    expect(screen.getByText("class 2")).toBeVisible();
    expect(modelIdCorrect).toBeTruthy();
  });

  test("should send data correctly to the backend server", async () => {
    render(
      <ModelChecklist
        onRetrain={retrainHandler}
        contentFetcher={contentFetcher}
        modelId="ModelId"
      />
    );
    await prepareView();
    userEvent.click(screen.getByText("class 1"));
    userEvent.click(screen.getByText("class 2"));
    userEvent.click(screen.getByText("Retrain"));
    await doneSendingClasses();
    expect(classesAreCorrect).toBeTruthy();
  });
});
