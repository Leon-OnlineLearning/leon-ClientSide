import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddContent from "../../components/add-content/addContent";
import LocalStorageMock from "../mocks/LocalstorageMock";
import "@testing-library/jest-dom/extend-expect";

const lsMock = new LocalStorageMock();

describe("Add content paging test suite", () => {
  test("should do paging correctly", () => {
    render(
      <AddContent
        sessionStorage={lsMock}
        courseId="12345"
        onFinish={async () => console.log("finished")}
      />
    );
    expect(screen.getByText(/related/)).toBeVisible();
    let previousShown = true;
    try {
      screen.getByText("Previous");
    } catch (e) {
      previousShown = false;
    }
    expect(previousShown).toBeFalsy();
    userEvent.click(screen.getByText("Next"));
    expect(screen.getByText(/non-related/)).toBeVisible();
    expect(screen.getByText("Previous")).toBeVisible();
    expect(screen.getByText("Next")).toBeVisible();
    userEvent.click(screen.getByText("Next"));
    expect(screen.getByText(/related/)).toBeVisible();
    userEvent.click(screen.getByText("Next"));
    expect(screen.getByText(/non-related/)).toBeVisible();
    userEvent.click(screen.getByText("Next"));
    expect(screen.getByText(/testing/)).toBeVisible();
    let nextShown = true;
    try {
      screen.getByText("Next");
    } catch (e) {
      nextShown = false;
    }
    expect(nextShown).toBeFalsy();
    expect(screen.getByText("Finish")).toBeVisible();
  });
});
