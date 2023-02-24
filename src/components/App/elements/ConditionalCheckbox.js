import { React } from "react";
import { useField } from "formik";

const ConditionalCheckbox = ({ label, displayToField, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="conditional-checkbox-group">
      <label
        className="conditional-checkbox__label"
        htmlFor="conditional-checkbox"
      >
        {label}
        <input
          type="checkbox"
          aria-label={props.name}
          className="conditional-checkbox"
          onBlur={props.handleBlur}
          onChange={(event) => {
            displayToField((previousState) => !previousState);
            field.onChange(event);
          }}
          {...props}
        />
      </label>
      {meta.touched && meta.error ? (
        <span className="error">{meta.error}</span>
      ) : null}
    </div>
  );
};

export default ConditionalCheckbox;
