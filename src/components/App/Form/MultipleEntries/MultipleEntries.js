import React, { useState } from "react";
import {
  AddEntryButton,
  NextSectionButton,
  SaveReviewedSectionButton,
  SkipSectionButton,
} from "../../elements/Buttons";
import { generateUniqueKeys } from "../shared-helpers";
import TemplateForm from "./Templates/TemplateForm";
import TemplateEntryBox from "./Templates/TemplateEntryBox";

const MultipleEntries = ({
  currentSectionName,
  dataHistory,
  displayNextPage,
  updateDataHistoryAndDisplayNextPage,
  updateDataHistoryAndDisableReviewMode,
  reviewMode,
}) => {
  const keys = generateUniqueKeys(5);
  const [savedEntries, setSavedEntries] = useState(
    !!dataHistory && !!dataHistory[currentSectionName]
      ? dataHistory[currentSectionName]
      : []
  );
  const [entryBeingEdited, setEntryBeingEdited] = useState({});
  const [workingOnEntry, setWorkingOnEntry] = useState(false);
  const editExistingEntry = (submittedContents, keyOfEntryBeingEdited) => {
    setSavedEntries((savedEntries) => [
      ...savedEntries.map((entry) => entry.key !== keyOfEntryBeingEdited),
      { ...submittedContents, key: keyOfEntryBeingEdited },
    ]);
  };
  const saveNewEntry = (entryToSave) => {
    setSavedEntries([...savedEntries, entryToSave]);
  };
  const prepareEntryForEdit = (keyOfEntryToEdit) => {
    setEntryBeingEdited(keyOfEntryToEdit);
  };
  const removeEntry = (keyOfEntryToRemove) => {
    const withoutEntryToRemove = savedEntries.map(
      (entry) => entry.key !== keyOfEntryToRemove
    );
    setSavedEntries(withoutEntryToRemove);
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

      {!workingOnEntry && savedEntries.length && (
        <div className="entries-viewer" aria-label="entries-viewer">
          {savedEntries.map((entry, index) => (
            <TemplateEntryBox
              currentSectionName={currentSectionName}
              entryContents={entry}
              prepareEntryForEdit={() => prepareEntryForEdit(entry.key)}
              removeEntry={() => removeEntry(entry.key)}
              key={keys[index]}
            />
          ))}
        </div>
      )}

      {!workingOnEntry && <AddEntryButton customHandler={setWorkingOnEntry} />}

      {reviewMode && !workingOnEntry && (
        <SaveReviewedSectionButton
          updateDataHistoryAndDisableReviewMode={updateDataHistoryAndDisableReviewMode(
            currentSectionName,
            savedEntries
          )}
        />
      )}

      {!reviewMode &&
        !workingOnEntry &&
        (savedEntries.length ? (
          <NextSectionButton
            customHandler={updateDataHistoryAndDisplayNextPage(
              currentSectionName,
              savedEntries
            )}
          />
        ) : (
          <SkipSectionButton customHandler={() => displayNextPage()} />
        ))}
    </main>
  );
};

export default MultipleEntries;
