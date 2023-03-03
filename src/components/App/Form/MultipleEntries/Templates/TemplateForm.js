import { Formik } from "formik";
import { getFormikData } from "./customFormData";
import TemplateFormFields from "./TemplateFormFields";

const TemplateForm = ({
  currentSectionName,
  editExistingEntry,
  entryBeingEdited,
  saveNewEntry,
}) => {
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
          saveNewEntry({
            ...submittedValues,
            key: JSON.stringify(submittedValues),
          });
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
          <button
            type="submit"
            className="save-entry button"
            aria-label="save-entry"
          >
            Save this entry
          </button>
        </form>
      )}
    </Formik>
  );
};

export default TemplateForm;
