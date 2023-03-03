import { React } from "react";
import { useField } from "formik";

const ConditionalCheckbox = ({ label, displayEndDateField, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div
      className={`conditional-checkbox-group ${props.name}`}
      aria-label="conditional-checkbox-group"
    >
      <label
        className="conditional-checkbox__label"
        aria-label="conditional-checkbox__label"
        htmlFor="conditional-checkbox"
      >
        {label}
      </label>
      <input
        type="checkbox"
        className="conditional-checkbox"
        aria-label="conditional-checkbox"
        onBlur={props.handleBlur}
        onChange={(event) => {
          displayEndDateField((previousState) => !previousState);
          field.onChange(event);
        }}
        {...props}
      />
      {meta.touched && meta.error ? (
        <span className="error" aria-label="error">
          {meta.error}
        </span>
      ) : null}
    </div>
  );
};

export default ConditionalCheckbox;
