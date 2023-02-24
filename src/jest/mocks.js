import { Formik, useField } from "formik";
import * as Yup from "yup";

const updateDataHistoryAndDisplaySelectionMenu = jest.fn(
  (values, currentSection) => true
);

const updateDataHistoryAndDisplayNextPage = updateDataHistoryAndDisplaySelectionMenu;

const updateDataHistory = updateDataHistoryAndDisplaySelectionMenu;

const displayNextPage = jest.fn();

const editExistingEntry = jest.fn();

const saveNewEntry = jest.fn((inputContents, keyOfEntryBeingEdited) => true);

const FakeCustomForm = ({ toggleWorkingOnEntry, setSavedEntries }) => {
  return (
    <>
      <form aria-label="form" />
      <button
        className="save-entry"
        aria-label="save-entry"
        onClick={() => {
          setSavedEntries((entries) => [...entries, { mockValue: "mock" }]);
          toggleWorkingOnEntry();
        }}
      >
        Save this entry
      </button>
    </>
  );
};

const FakeEntryViewer = () => {
  return <div className="entry-viewer" aria-label="entry-viewer" />;
};

export {
  FakeCustomForm,
  FakeEntryViewer,
  editExistingEntry,
  displayNextPage,
  saveNewEntry,
  updateDataHistory,
  updateDataHistoryAndDisplayNextPage,
  updateDataHistoryAndDisplaySelectionMenu,
};
