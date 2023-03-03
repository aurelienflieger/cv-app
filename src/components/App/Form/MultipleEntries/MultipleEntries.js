import React, { useState } from "react";
import {
  AddEntryButton,
  NextSectionButton,
  SaveReviewedSectionButton,
  SkipSectionButton,
} from "../../elements/Buttons";
import TemplateEntryBox from "./Templates/TemplateEntryBox";
import TemplateForm from "./Templates/TemplateForm";

const MultipleEntries = ({
  currentSectionName,
  dataHistory,
  eventHandlers,
  reviewMode,
}) => {
  const { displayNextPage, handleSubmission } = eventHandlers;
  const [entryBeingEdited, setEntryBeingEdited] = useState({});
  const [savedEntries, setSavedEntries] = useState(
    !!dataHistory ? dataHistory : []
  );
  const [workingOnEntry, setWorkingOnEntry] = useState(false);

  const checkMaximumEntriesThreshold = () => {
    const maxEntries = {
      Career: 5,
      default: 3,
      Education: 2,
    };
    return maxEntries[currentSectionName]
      ? savedEntries.length === maxEntries[currentSectionName]
      : savedEntries.length === maxEntries["default"];
  };

  const editExistingEntry = (submittedContents, keyOfEntryBeingEdited) => {
    setSavedEntries((savedEntries) => [
      ...savedEntries.filter((entry) => entry.key !== keyOfEntryBeingEdited),
      { ...submittedContents, key: keyOfEntryBeingEdited },
    ]);
    setWorkingOnEntry(false);
    setEntryBeingEdited({});
  };

  const prepareEntryForEdit = (keyOfEntryToEdit) => {
    const entryToEdit = savedEntries.find(
      (entry) => entry.key === keyOfEntryToEdit
    );
    setEntryBeingEdited(entryToEdit);
    setWorkingOnEntry(true);
  };

  const removeEntry = (keyOfEntryToRemove) => {
    const withoutEntryToRemove = savedEntries.filter(
      (entry) => entry.key !== keyOfEntryToRemove
    );
    setSavedEntries(withoutEntryToRemove);
  };

  const saveNewEntry = (entryToSave) => {
    setSavedEntries([...savedEntries, entryToSave]);
    setWorkingOnEntry(false);
  };

  return (
    <main
      className={`multiple-entries ${currentSectionName}`}
      name="multiple-entries"
    >
      {workingOnEntry && (
        <TemplateForm
          currentSectionName={currentSectionName}
          editExistingEntry={editExistingEntry}
          entryBeingEdited={entryBeingEdited}
          saveNewEntry={saveNewEntry}
        />
      )}

      {!workingOnEntry && !!savedEntries.length && (
        <div
          className={`entries-viewer ${currentSectionName}`}
          aria-label="entries-viewer"
        >
          {savedEntries.map((entry) => {
            return (
              <TemplateEntryBox
                currentSectionName={currentSectionName}
                entryContents={entry}
                prepareEntryForEdit={() => prepareEntryForEdit(entry.key)}
                removeEntry={() => removeEntry(entry.key)}
                key={JSON.stringify(entry.key)}
              />
            );
          })}
        </div>
      )}

      {!workingOnEntry && (
        <AddEntryButton
          isDisabled={checkMaximumEntriesThreshold()}
          customHandler={setWorkingOnEntry}
          text={"Add an entry"}
        />
      )}

      {reviewMode && !workingOnEntry && (
        <SaveReviewedSectionButton
          customHandler={() => {
            handleSubmission(
              { values: savedEntries, currentSectionName },
              { isOptionalSection: true, isReviewMode: reviewMode }
            );
          }}
        />
      )}

      {!reviewMode &&
        !workingOnEntry &&
        (savedEntries.length ? (
          <NextSectionButton
            customHandler={() => {
              handleSubmission(
                { values: savedEntries, currentSectionName },
                { isOptionalSection: true, isReviewMode: reviewMode }
              );
            }}
          />
        ) : (
          <SkipSectionButton
            customHandler={() => {
              displayNextPage("Optional");
            }}
          />
        ))}
    </main>
  );
};

export default MultipleEntries;
