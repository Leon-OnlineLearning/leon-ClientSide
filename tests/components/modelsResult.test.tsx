import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";
import ModelsView from "../../components/models-view/models-view";
import "@testing-library/jest-dom/extend-expect";

describe("Models results view", () => {
  let courseIdSentCorrectly = false;
  const server = setupServer(
    rest.get("/courses/:courseId/models", (req, res, ctx) => {
      courseIdSentCorrectly = req.params["courseId"] === "courseId";
      return res(
        ctx.json([
          {
            name: "model1",
            id: "123456789",
            subModules: [
              {
                name: "subModule1",
                id: "12345",
                accuracy: "90%",
              },
              { id: "1234566", name: "subModule2", accuracy: "92%" },
            ],
            accuracy: "80%",
            associatedTest: true,
          },
          {
            name: "model2",
            id: "1234567890",
            accuracy: "80%",
          },
        ])
      );
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("it should display model info and show test results button correctly", async () => {
    render(
      <ModelsView
        courseId="courseId"
        modelsFetcher={async (courseId) => {
          return await axios
            .get(`/courses/${courseId}/models`)
            .then((resp) => resp.data)
            .catch((err) => console.error(err));
        }}
        onRaiseModel={async (courseId, modelId) => {
          return await axios
            .post(`/models/${modelId}/raise`)
            .then((resp) => resp.data)
            .catch((err) => console.error(err));
        }}
      />
    );
    await waitFor(() => screen.getByTestId("model-container-model1"));
    await waitFor(() => screen.getByTestId("model-container-model2"));
    expect(screen.getAllByText("Show test").length).toEqual(1);
    expect(screen.getByText(/model1/)).toBeVisible();
    expect(screen.getByText(/subModule1/)).toBeVisible();
    expect(screen.getByText(/model2/)).toBeVisible();
    expect(screen.getAllByText("Raise").length).toEqual(2);
    expect(courseIdSentCorrectly).toBeTruthy();
  });
});
