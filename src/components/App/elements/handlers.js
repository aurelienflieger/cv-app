import { useEffect } from "react";

const toggleFocusStyle = (event) => {
  event.target.parentNode.classList.remove("incorrect");
  event.target.parentNode.classList.remove("correct");
  event.target.parentNode.classList.toggle("focused");
};
const toggleErrorStyle = (event) => {
  if (event.target) {
    event.target.parentNode.classList.remove("correct");
    event.target.parentNode.classList.add("incorrect");
  }
};
const toggleSuccessStyle = (event) => {
  event.target.parentNode.classList.remove("incorrect");
  event.target.parentNode.classList.add("correct");
};

const updateStylesOnBlur = (event, field, meta, setLastTouched) => {
  field.onBlur(event);
  meta.touched && meta.error && toggleErrorStyle(event);
  meta.touched && !meta.error && toggleSuccessStyle(event);
  toggleFocusStyle(event);
  setLastTouched(event);
};

const updateStylesOnFocus = (event, handleFocus) => {
  toggleFocusStyle(event);
  handleFocus && handleFocus(event);
};

const useErrorStyling = (meta, lastTouched) => {
  useEffect(() => {
    meta.touched && meta.error && toggleErrorStyle(lastTouched);
  });
};

const useFieldUpdater = (selection, name, setFieldValue) => {
  useEffect(() => {
    if (selection) setFieldValue(name, selection);
  }, [setFieldValue, name, selection]);
};

export {
  toggleErrorStyle,
  toggleFocusStyle,
  toggleSuccessStyle,
  updateStylesOnBlur,
  updateStylesOnFocus,
  useErrorStyling,
  useFieldUpdater,
};
