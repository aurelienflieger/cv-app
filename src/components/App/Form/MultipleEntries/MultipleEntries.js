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
  const [keys, setKeys] = useState(generateUniqueKeys(100));
  const [savedEntries, setSavedEntries] = useState(
    !!dataHistory && !!dataHistory[currentSectionName]
      ? dataHistory[currentSectionName]
      : []
  );
  const [entryBeingEdited, setEntryBeingEdited] = useState({});
  const [workingOnEntry, setWorkingOnEntry] = useState(false);

  const editExistingEntry = (submittedContents, keyOfEntryBeingEdited) => {
    setSavedEntries((savedEntries) => [
      ...savedEntries.filter((entry) => entry.key !== keyOfEntryBeingEdited),
      { ...submittedContents, key: keyOfEntryBeingEdited },
    ]);
    setWorkingOnEntry(false);
    setEntryBeingEdited({});
  };

  const saveNewEntry = (entryToSave) => {
    setSavedEntries([...savedEntries, entryToSave]);
    setWorkingOnEntry(false);
  };

  const getKey = () => {
    const key = keys[0];
    setKeys((remainingKeys) => [
      ...remainingKeys.filter((_, index) => index !== 0),
    ]);
    return key;
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

  const checkIfMaximumEntriesReached = () => {
    const maxEntries = {
      Career: 5,
      Education: 2,
      default: 3,
    };

    return maxEntries[currentSectionName]
      ? savedEntries.length === maxEntries[currentSectionName]
      : savedEntries.length === maxEntries["default"];
  };

  return (
    <main
      className={`multiple-entries multiple-entries_${currentSectionName}`}
      name="multiple-entries"
    >
      {workingOnEntry && (
        <TemplateForm
          currentSectionName={currentSectionName}
          editExistingEntry={editExistingEntry}
          entryBeingEdited={entryBeingEdited}
          saveNewEntry={saveNewEntry}
          getKey={() => getKey()}
        />
      )}

      {!workingOnEntry && !!savedEntries.length && (
        <div
          className={`entries-viewer entries-viewer_${currentSectionName}`}
          aria-label="entries-viewer"
        >
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

      {!workingOnEntry && (
        <AddEntryButton
          isDisabled={checkIfMaximumEntriesReached()}
          customHandler={setWorkingOnEntry}
          text={"Add an entry"}
        />
      )}

      {reviewMode && !workingOnEntry && (
        <SaveReviewedSectionButton
          updateDataHistoryAndDisableReviewMode={() =>
            updateDataHistoryAndDisableReviewMode(
              currentSectionName,
              savedEntries
            )
          }
        />
      )}

      {!reviewMode &&
        !workingOnEntry &&
        (savedEntries.length ? (
          <NextSectionButton
            customHandler={() =>
              updateDataHistoryAndDisplayNextPage(
                currentSectionName,
                savedEntries
              )
            }
          />
        ) : (
          <SkipSectionButton customHandler={() => displayNextPage()} />
        ))}
    </main>
  );
};

export default MultipleEntries;
