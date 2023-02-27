import React, { useState } from "react";

const EntryControlButtons = ({ prepareEntryForEdit, removeEntry }) => {
  return (
    <div className="entry-control-buttons" aria-label="entry-control-buttons">
      <button
        type="button"
        className="edit button"
        aria-label="edit"
        onClick={prepareEntryForEdit}
      />

      <button
        type="button"
        className="remove button"
        aria-label="remove"
        onClick={removeEntry}
      />
    </div>
  );
};

const EntryControlManager = (props) => {
  const [entryMenu, setEntryMenu] = useState(false);
  return (
    <div className="entry-manager" aria-label="entry-manager">
      {entryMenu && <EntryControlButtons {...props} />}
      <button
        type="button"
        className="entry-manager__trigger button"
        aria-label="entry-manager__trigger"
        onClick={() => setEntryMenu(!entryMenu)}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
    </div>
  );
};

export default EntryControlManager;
