import EntryControlManager from "../../../elements/EntryControl";
import TemplateEntryFields from "./TemplateEntryFields";

const TemplateEntryBox = (
  {currentSectionName,
  entryContents,
  prepareEntryForEdit,
  removeEntry}
) => {
  return (
    <div className={`entry-box ${currentSectionName}`}>
      <TemplateEntryFields
        currentSectionName={currentSectionName}
        entryContents={entryContents}
      />
      <EntryControlManager
        prepareEntryForEdit={prepareEntryForEdit}
        removeEntry={removeEntry}
      />
    </div>
  );
};

export default TemplateEntryBox;
