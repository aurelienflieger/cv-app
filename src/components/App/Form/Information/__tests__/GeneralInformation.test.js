import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GeneralInformation from "../GeneralInformation";
import {
  updateDataHistory,
  updateDataHistoryAndDisplaySelectionMenu,
} from "../../../../../jest/mocks";

const elementsToDisplay = [
  { name: null, role: "main" },
  { name: "form", role: "form" },
  { name: "firstName", role: "textbox" },
  { name: "lastName", role: "textbox" },
  { name: "phone", role: "textbox" },
  { name: "email", role: "textbox" },
  { name: "home", role: "textbox" },
  { name: "city", role: "textbox" },
  { name: "country", role: "textbox" },
  { name: "birthDate", role: "textbox" },
  { name: "workField", role: "textbox" },
  { name: "introduction", role: "textbox" },
];

const formElements = elementsToDisplay.slice(2);

const inputContents = [
  "fake first name",
  "fake last name",
  "fake phone",
  "fake@mail.com",
  "fake home address",
  "fake city",
  "fake country",
  "2011-01-01",
  "fake work field",
  "fake introduction",
];

const submittedContents = {
  firstName: "fake first name",
  lastName: "fake last name",
  phone: "fake phone",
  email: "fake@mail.com",
  home: "fake home address",
  city: "fake city",
  country: "fake country",
  birthDate: "2011-01-01",
  workField: "fake work field",
  introduction: "fake introduction",
};

describe("General Education is correctly displayed.", () => {
  test.each(elementsToDisplay)(
    "Element: $role // Name: $name",
    ({ name, role }) => {
      render(<GeneralInformation />);
      expect(screen.getByRole(role, { name: name || "" })).toBeInTheDocument();
    }
  );
});

describe("The form buttons render conditionally.", () => {
  test("By default, the next section button appears", () => {
    render(<GeneralInformation />);
    const nextSection = screen.getByRole("button", {
      name: "next-section",
    });
    expect(nextSection).toBeInTheDocument();
  });

  test("In review mode, the button to save reviewed contents appears.", () => {
    render(<GeneralInformation reviewMode={true} />);
    const saveReviewedSection = screen.getByRole("button", {
      name: "save-reviewed-section",
    });
    expect(saveReviewedSection).toBeInTheDocument();
  });
});

test("The input contents are live-updated correctly", async () => {
  const user = userEvent.setup();
  render(
    <GeneralInformation
      updateDataHistoryAndDisplaySelectionMenu={
        updateDataHistoryAndDisplaySelectionMenu
      }
    />
  );
  formElements.forEach(async (element, index) => {
    const inDOM = screen.getByRole(element.role, { name: element.name });
    if (element.name === "birthDate") {
      fireEvent.mouseDown(inDOM);
      fireEvent.change(inDOM, { target: { value: inputContents[index] } });
    } else {
      await user.type(inDOM, inputContents[index]);
    }
    expect(inDOM.value).toBe(inputContents[index]);
  });
});

describe("The form buttons use the right handlers.", () => {
  describe("In standard mode", () => {
    test("When the form is completed, the updateDataHistoryAndDisplaySelectionMenu function is called.", () => {
      const user = userEvent.setup();
      render(
        <GeneralInformation
          updateDataHistoryAndDisplaySelectionMenu={
            updateDataHistoryAndDisplaySelectionMenu
          }
        />
      );
      formElements.forEach(async (element, index) => {
        const inDOM = screen.getByRole(element.role, { name: element.name });
        const nextSection = screen.getByRole("button", {
          name: "next-section",
        });
        if (element.name === "birthDate") {
          fireEvent.mouseDown(inDOM);
          fireEvent.change(inDOM, { target: { value: inputContents[index] } });
        } else {
          await user.type(inDOM, inputContents[index]);
        }
        await user.click(nextSection);
        expect(updateDataHistoryAndDisplaySelectionMenu).toHaveBeenCalledWith(
          submittedContents,
          "general-information"
        );
      });
    });
  });
  describe("In review mode", () => {
    test("When the form is completed, the updateDataHistory function is called.", () => {
      const user = userEvent.setup();
      render(
        <GeneralInformation
          reviewMode
          updateDataHistory={updateDataHistory}
          updateDataHistoryAndDisplaySelectionMenu={
            updateDataHistoryAndDisplaySelectionMenu
          }
        />
      );
      formElements.forEach(async (element, index) => {
        const inDOM = screen.getByRole(element.role, { name: element.name });
        const saveReviewedSection = screen.getByRole("button", {
          name: "save-reviewed-section",
        });
        if (element.name === "birthDate") {
          fireEvent.mouseDown(inDOM);
          fireEvent.change(inDOM, { target: { value: inputContents[index] } });
        } else {
          await user.type(inDOM, inputContents[index]);
        }
        await user.click(saveReviewedSection);
        expect(updateDataHistory).toHaveBeenCalledWith(
          submittedContents,
          "general-information"
        );
      });
    });
  });
});

describe("An empty or incomplete form does not submit.", () => {
  describe("No handler function is called from clicking the form buttons of an empty form.", () => {
    test("In standard mode", () => {
      const user = userEvent.setup();
      render(
        <GeneralInformation
          updateDataHistoryAndDisplaySelectionMenu={
            updateDataHistoryAndDisplaySelectionMenu
          }
        />
      );
      formElements.forEach(async () => {
        const nextSection = screen.getByRole("button", {
          name: "next-section",
        });
        await user.click(nextSection);
        expect(updateDataHistoryAndDisplaySelectionMenu).not.toHaveBeenCalled();
      });
    });
    test("In review mode", () => {
      const user = userEvent.setup();
      render(
        <GeneralInformation reviewMode updateDataHistory={updateDataHistory} />
      );
      formElements.forEach(async () => {
        const saveReviewedSection = screen.getByRole("button", {
          name: "save-reviewed-section",
        });
        await user.click(saveReviewedSection);
        expect(updateDataHistory).not.toHaveBeenCalled();
      });
    });
  });
});

describe("The default input values dynamically adapt to the context.", () => {
  test("By default, the input fields have no value.", () => {
    render(
      <GeneralInformation
        updateDataHistoryAndDisplaySelectionMenu={
          updateDataHistoryAndDisplaySelectionMenu
        }
      />
    );
    const allInputs = screen.getAllByRole("textbox");
    allInputs.forEach((input) => {
      expect(input.value.length).toBe(0);
    });
  });

  test("In review mode, the input fields have the previously added values.", () => {
    render(
      <GeneralInformation
        reviewMode
        dataHistory={submittedContents}
        updateDataHistoryAndDisplaySelectionMenu={
          updateDataHistoryAndDisplaySelectionMenu
        }
      />
    );
    const allInputs = screen.getAllByRole("textbox");
    allInputs.forEach((input) => {
      expect(input.value.length).toBeGreaterThan(0);
    });
  });
});
