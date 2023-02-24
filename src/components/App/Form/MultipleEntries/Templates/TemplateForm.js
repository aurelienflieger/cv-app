import { Formik } from "formik";
import { generateUniqueKeys } from "../../shared-helpers";
import { getFormikData } from "./helpers";
import TemplateFormFields from "./TemplateFormFields";

const TemplateForm = ({
  currentSectionName,
  editExistingEntry,
  entryBeingEdited,
  saveNewEntry,
}) => {
  const keys = generateUniqueKeys(5);
  const isCurrentlyEditing = !!Object.keys(entryBeingEdited).length;
  const customFormikData = getFormikData(
    currentSectionName,
    entryBeingEdited,
    isCurrentlyEditing
  );

  return (
    <Formik
      initialValues={customFormikData.initialValues}
      validationSchema={customFormikData.validationSchema}
      onSubmit={(submittedValues, { setSubmitting }) => {
        if (isCurrentlyEditing) {
          editExistingEntry(submittedValues, entryBeingEdited.key);
        } else {
          saveNewEntry({ ...submittedValues, key: keys.shift() });
        }
        setSubmitting(false);
      }}
    >
      {(formikProps) => (
        <form
          aria-label="form"
          className="form"
          onReset={formikProps.handleReset}
          onSubmit={formikProps.handleSubmit}
        >
          <TemplateFormFields currentSectionName={currentSectionName} />
          <button type="submit" className="save-entry" aria-label="save-entry">
            Save this entry
          </button>
        </form>
      )}
    </Formik>
  );
};

export default TemplateForm;
