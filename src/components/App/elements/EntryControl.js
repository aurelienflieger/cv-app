import React from "react";

const EntryControlButtons = ({ prepareEntryForEdit, removeEntry }) => {
  <div className="entry-control-buttons" aria-label="entry-control-buttons">
    <button
      type="button"
      className="edit"
      aria-label="edit"
      onClick={prepareEntryForEdit}
    />
    ;
    <button
      type="button"
      className="remove"
      aria-label="remove"
      onClick={removeEntry}
    />
    ;
  </div>;
};

const EntryControlManager = (props) => {
  const [entryMenu, setEntryMenu] = this.state;
  return (
    <div className="entry-manager" aria-label="entry-manager">
      {entryMenu && <EntryControlButtons {...props} />}
      <button
        type="button"
        className="entry-manager"
        aria-label="entry-manager"
        onClick={() => setEntryMenu(!entryMenu)}
      />
    </div>
  );
};

export default EntryControlManager;
