import { isMainSection } from "./customFormData";

const TemplateEntryFields = ({ currentSectionName, entryContents }) => {
  return (
    <div className="entry-fields" aria-label="entry-fields">
      {isMainSection(currentSectionName) ? (
        <>
          <span className="entry-field" aria-label="establishment">
            {entryContents.establishment}
          </span>
          <span className="entry-field" aria-label="from-to">
            {entryContents.startDate} to {entryContents.endDate || "now"}
          </span>
        </>
      ) : (
        <>
          <span className="entry-field" aria-label="extra">
            {entryContents.extra}
          </span>
          <span className="entry-field" aria-label="proficiency">
            {entryContents.proficiency}
          </span>
        </>
      )}
    </div>
  );
};

export default TemplateEntryFields;
