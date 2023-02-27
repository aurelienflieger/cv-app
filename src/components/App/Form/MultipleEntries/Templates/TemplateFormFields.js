import { useState } from "react";
import ConditionalCheckbox from "../../../elements/ConditionalCheckbox";
import { InputBox, InputBoxWithDropdown } from "../../../elements/InputBox";
import { getFieldsContents, isMainSection } from "./helpers";
import TextBox from "../../../elements/TextBox";
import Select from "../../../elements/Select";

const TemplateFormFields = ({ currentSectionName }) => {
  const [endDateFieldDisplayed, displayEndDateField] = useState(false);
  const { contents, dropdown } = getFieldsContents(currentSectionName);

  return isMainSection(currentSectionName) ? (
    <>
      <ConditionalCheckbox
        name="status"
        displayEndDateField={displayEndDateField}
        label={contents.status.label}
      />
      <InputBox
        type="text"
        name="establishment"
        label={contents.establishment.label}
        placeholder={contents.establishment.placeholder}
      />
      <InputBox
        type="text"
        name="context"
        label={contents.context.label}
        placeholder={contents.context.placeholder}
      />
      {endDateFieldDisplayed && (
        <InputBox type="date" role="textbox" name="endDate" label="To" />
      )}
      <InputBox type="date" role="textbox" name="startDate" label="From" />
      <TextBox
        maxCharacters={50}
        name="description"
        label={contents.description.label}
        placeholder={contents.description.placeholder}
      />
    </>
  ) : (
    <>
      <InputBoxWithDropdown
        type="text"
        name="extra"
        label={contents.label}
        placeholder={contents.placeholder}
        contents={dropdown}
      />
      <Select name="skill" label="Proficiency" />
    </>
  );
};

export default TemplateFormFields;
