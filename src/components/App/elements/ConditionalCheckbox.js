import { React } from "react";
import { useField } from "formik";

const ConditionalCheckbox = ({ label, displayEndDateField, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={`conditional-checkbox-group ${props.name}`}>
      <label
        className="conditional-checkbox__label"
        htmlFor="conditional-checkbox"
      >
        {label}
      </label>
      <input
        type="checkbox"
        aria-label={props.name}
        className="conditional-checkbox"
        onBlur={props.handleBlur}
        onChange={(event) => {
          displayEndDateField((previousState) => !previousState);
          field.onChange(event);
        }}
        {...props}
      />
      {meta.touched && meta.error ? (
        <span className="error">{meta.error}</span>
      ) : null}
    </div>
  );
};

export default ConditionalCheckbox;
