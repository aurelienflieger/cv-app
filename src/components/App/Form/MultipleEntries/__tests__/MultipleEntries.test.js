import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MultipleEntries from "../MultipleEntries";
import {
  FakeCustomForm,
  FakeEntryViewer,
  displayNextPage,
  updateDataHistory,
  updateDataHistoryAndDisplayNextPage,
} from "../../../../../jest/mocks";

describe("The page displays correctly.", () => {
  test("Without any entries, the page displays an Add button and a Skip Button. The Viewer div is not displayed.", () => {
    const view = render(<MultipleEntries currentSectionName="test-section" />);
    const viewer = screen.queryByRole("generic", { name: "entries-viewer" });
    const addButton = screen.getByRole("button", { name: "add-entry" });
    const skipButton = screen.getByRole("button", { name: "skip-section" });
    expect(viewer).not.toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(skipButton).toBeInTheDocument();
  });

  describe("Clicking the Add Button toggles working mode on.", () => {
    it("hides the landing page", async () => {
      const user = userEvent.setup();
      const view = render(
        <MultipleEntries
          currentSectionName="test-section"
          CustomForm={FakeCustomForm}
          CustomViewer={FakeEntryViewer}
        />
      );
      const entryViewer = screen.queryByRole("generic", {
        name: "entry-viewer",
      });
      const addButton = screen.queryByRole("button", { name: "add-entry" });
      const skipButton = screen.queryByRole("button", { name: "skip-section" });
      await user.click(addButton);
      expect(entryViewer).not.toBeInTheDocument();
      expect(addButton).not.toBeInTheDocument();
      expect(skipButton).not.toBeInTheDocument();
    });

    it("displays the Custom Form", async () => {
      const user = userEvent.setup();
      const view = render(
        <MultipleEntries
          currentSectionName="test-section"
          CustomForm={FakeCustomForm}
        />
      );
      const addButton = screen.queryByRole("button", { name: "add-entry" });
      await user.click(addButton);
      const customForm = screen.queryByRole("form", { name: "form" });
      expect(customForm).toBeInTheDocument();
    });
  });

  describe("Clicking the Save Entry button toggles working mode off.", () => {
    it("hides the Custom Form.", async () => {
      const user = userEvent.setup();
      const view = render(
        <MultipleEntries
          currentSectionName="test-section"
          CustomForm={FakeCustomForm}
        />
      );
      const addButton = screen.getByRole("button", { name: "add-entry" });
      const customForm = screen.queryByRole("form", { name: "form" });
      const saveEntryButton = screen.queryByRole("button", {
        name: "save-entry",
      });
      await user.click(addButton);
      await user.click(saveEntryButton);
      expect(customForm).not.toBeInTheDocument();
    });
  });

  it("displays back the landing page with the entries viewer displayed.", async () => {
    const user = userEvent.setup();
    const view = render(
      <MultipleEntries
        currentSectionName="test-section"
        CustomForm={FakeCustomForm}
        CustomViewer={FakeEntryViewer}
      />
    );
    const addButton = screen.queryByRole("button", { name: "add-entry" });
    await user.click(addButton);
    const saveEntryButton = screen.queryByRole("button", {
      name: "save-entry",
    });
    await user.click(saveEntryButton);
    const entryViewer = screen.queryByRole("generic", {
      name: "entry-viewer",
    });
    expect(
      screen.getByRole("button", { name: "add-entry" })
    ).toBeInTheDocument();
    expect(entryViewer).toBeInTheDocument();
  });
});

describe("The landing page buttons appear conditionally.", () => {
  test("In standard mode: the Next/Skip Section button", () => {
    const user = userEvent.setup();
    const view = render(
      <MultipleEntries
        currentSectionName="test-section"
        CustomForm={FakeCustomForm}
        CustomViewer={FakeEntryViewer}
      />
    );
    const skipButton = screen.getByRole("button", { name: "skip-section" });
    expect(skipButton).toBeInTheDocument();
  });

  test("In review mode: the Save Reviewed Contents button", () => {
    const user = userEvent.setup();
    const view = render(
      <MultipleEntries
        currentSectionName="test-section"
        CustomForm={FakeCustomForm}
        CustomViewer={FakeEntryViewer}
        reviewMode
      />
    );
    const skipButton = screen.queryByRole("button", { name: "skip-section" });
    const saveReviewedSectionButton = screen.getByRole("button", {
      name: "save-reviewed-section",
    });
    expect(saveReviewedSectionButton).toBeInTheDocument();
    expect(skipButton).not.toBeInTheDocument();
  });
});

describe("The landing page buttons trigger the right handlers.", () => {
  test("Next Section: updateDataHistoryAndDisplayNextPage", async () => {
    const user = userEvent.setup();
    const view = render(
      <MultipleEntries
        currentSectionName="test-section"
        CustomForm={FakeCustomForm}
        CustomViewer={FakeEntryViewer}
        updateDataHistoryAndDisplayNextPage={
          updateDataHistoryAndDisplayNextPage
        }
      />
    );
    const addButton = screen.queryByRole("button", { name: "add-entry" });
    await user.click(addButton);
    const saveEntryButton = screen.queryByRole("button", {
      name: "save-entry",
    });
    await user.click(saveEntryButton);
    const nextSectionButton = screen.queryByRole("button", {
      name: "next-section",
    });
    await user.click(nextSectionButton);
    expect(updateDataHistoryAndDisplayNextPage).toHaveBeenCalledWith(
      [{ mockValue: "mock" }],
      "test-section"
    );
  });

  test("Skip Section displayNextPage:", async () => {
    const user = userEvent.setup();
    const view = render(
      <MultipleEntries
        currentSectionName="test-section"
        CustomForm={FakeCustomForm}
        CustomViewer={FakeEntryViewer}
        displayNextPage={displayNextPage}
        updateDataHistoryAndDisplayNextPage={
          updateDataHistoryAndDisplayNextPage
        }
      />
    );
    const skipButton = screen.getByRole("button", { name: "skip-section" });
    await user.click(skipButton);
    expect(displayNextPage).toHaveBeenCalled();
  });

  test("Save Reviewed Contents: updateDataHistory", async () => {
    const user = userEvent.setup();
    const view = render(
      <MultipleEntries
        currentSectionName="test-section"
        CustomForm={FakeCustomForm}
        CustomViewer={FakeEntryViewer}
        dataHistory={{ "test-section": [{ mockedValue: 1 }] }}
        updateDataHistory={updateDataHistory}
        reviewMode
      />
    );
    const saveReviewedSectionButton = screen.getByRole("button", {
      name: "save-reviewed-section",
    });
    await user.click(saveReviewedSectionButton);
    expect(updateDataHistory).toHaveBeenCalledWith(
      [{ mockedValue: 1 }],
      "test-section"
    );
  });
});
