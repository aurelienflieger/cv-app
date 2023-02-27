import { useState, useEffect } from "react";
import { useField } from "formik";
import {
  toggleErrorStyle,
  toggleSuccessStyle,
  toggleFocusStyle,
} from "./handlers";

const TextBox = ({ label, maxCharacters, ...props }) => {
  const [field, meta] = useField(props);
  const [didFocus, setFocus] = useState(false);
  const [lastTouched, setLastTouched] = useState("");
  const handleFocus = () => setFocus(true);
  const showFeedback = !!didFocus || meta.touched;

  useEffect(() => {
    meta.touched && meta.error && toggleErrorStyle(lastTouched);
  });

  return (
    <div className={`textbox__wrapper ${props.name}`}>
      <div className="label-feedback__wrapper">
        <label className="textbox__label" htmlFor={props.name}>
          {label}
        </label>
        {showFeedback && (
          <span className="feedback">
            {`${maxCharacters - field.value.length} characters left`}
          </span>
        )}
      </div>
      <input
        className="textbox__field"
        aria-label={props.name}
        name={props.name}
        onFocus={(event) => {
          toggleFocusStyle(event);
          handleFocus(event);
        }}
        onBlur={(event) => {
          props.handleBlur && props.handleBlur(event);
          field.onBlur(event);
          toggleFocusStyle(event);
          if (meta.touched && meta.error) toggleErrorStyle(event);
          if (meta.touched && !meta.error) toggleSuccessStyle(event);
          setLastTouched(event);
        }}
        onChange={(event) => {
          field.onChange(event);
        }}
        value={field.value}
        {...props}
      />
      {meta.touched && meta.error && (
        <span className="error">{meta.error}</span>
      )}
    </div>
  );
};

export default TextBox;
