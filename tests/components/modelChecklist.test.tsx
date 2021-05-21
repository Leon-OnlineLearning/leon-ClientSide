import { rest } from "msw";
import { setupServer } from "msw/lib/types/node";

describe("Model check list test suite", () => {
  const server = setupServer(
    rest.get("/models/:modelId/classes", (req, res, ctx) => {
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
          {
            id: "12347",
            name: "class 3",
          },
          {
            id: "12348",
            name: "class 4",
          },
        ])
      );
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
});
