import { useState } from "react";
import { useField } from "formik";
import {
  useErrorStyling,
  updateStylesOnBlur,
  updateStylesOnFocus,
} from "./handlers";
import Error from "./Error";

const TextBox = ({ label, maxCharacters, ...props }) => {
  const [field, meta] = useField(props);
  const [lastTouched, setLastTouched] = useState("");
  const [didFocus, setFocus] = useState(false);
  const showFeedback = !!didFocus || meta.touched;
  const handleFocus = () => setFocus(true);
  useErrorStyling(meta, lastTouched);

  return (
    <div
      className={`textbox__box ${props.name} field`}
      aria-label="textbox__box"
    >
      <div className="label-feedback__box" aria-label="label-feedback__box">
        <label
          className="textbox__label"
          aria-label="textbox__label"
          htmlFor={props.name}
        >
          {label}
        </label>
        {showFeedback && (
          <span className="feedback" aria-label="feedback">
            {`${maxCharacters - field.value.length} characters left`}
          </span>
        )}
      </div>
      <input
        className="textbox__field"
        aria-label="textbox__field"
        name={props.name}
        onBlur={(event) =>
          updateStylesOnBlur(event, field, meta, setLastTouched)
        }
        onChange={(event) => field.onChange(event)}
        onFocus={(event) => updateStylesOnFocus(event, handleFocus)}
        value={field.value}
        {...props}
      />
      <Error meta={meta} />
    </div>
  );
};

export default TextBox;
