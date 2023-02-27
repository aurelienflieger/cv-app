import { isMainSection } from "./helpers";

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
          <span className="entry-field" aria-label="title">
            {entryContents.title}
          </span>
          <span className="entry-field" aria-label="skill">
            {entryContents.skill}
          </span>
        </>
      )}
    </div>
  );
};

export default TemplateEntryFields;
