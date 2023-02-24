import { useState } from "react";
import { useField } from "formik";

const TextBox = ({ label, maxCharacters, ...props }) => {
  const [field, meta] = useField(props);
  const [didFocus, setFocus] = useState(false);
  const handleFocus = () => setFocus(true);
  const showFeedback = !!didFocus || meta.touched;

  return (
    <div className="textbox__wrapper">
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
        onFocus={handleFocus}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};

export default TextBox;
