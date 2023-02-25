import { useState, useEffect } from "react";
import { useField } from "formik";
import { generateUniqueKeys } from "../Form/shared-helpers";
import {
  toggleErrorStyle,
  toggleSuccessStyle,
  toggleFocusStyle,
} from "./handlers";

export const InputBox = ({ label, customChangeHandler, ...props }) => {
  const [field, meta] = useField(props);
  const [lastTouched, setLastTouched] = useState("");
  useEffect(() => {
    meta.touched && meta.error && toggleErrorStyle(lastTouched);
  });

  return (
    <div className="input-box">
      <label className="input-box__label" htmlFor={props.name}>
        {label}
      </label>
      <input
        aria-label={props.name}
        className="input-box__field"
        value={field.value}
        onBlur={(event) => {
          props.handleBlur && props.handleBlur(event);
          field.onBlur(event);
          toggleFocusStyle(event);
          if (meta.touched && meta.error) toggleErrorStyle(event);
          if (meta.touched && !meta.error) toggleSuccessStyle(event);
          setLastTouched(event);
        }}
        onFocus={toggleFocusStyle}
        onChange={(event) => {
          customChangeHandler && customChangeHandler(event);
          field.onChange(event);
        }}
        {...props}
      />
      {meta.touched && meta.error && (
        <span className="error">{meta.error}</span>
      )}
    </div>
  );
};

export const InputBoxWithDropdown = ({ contents, ...props }) => {
  const [field] = useField(props);
  const [selection, setSelection] = useState(field.value);
  const [dropdown, showDropdown] = useState(false);
  const showDropdownMatch = (event) => {
    showDropdown(true);
    setSelection(event.target.value);
  };
  const keys = generateUniqueKeys(300);

  return (
    <div className="input-box-with-dropdown">
      <InputBox
        type="text"
        name={props.name}
        label={props.label}
        placeholder={props.placeholder}
        customChangeHandler={showDropdownMatch}
        value={selection}
      />
      {dropdown && (
        <div className="dropdown">
          {contents.map((item) => {
            return (
              item.includes(selection) && (
                <input
                  className="dropdown-item"
                  key={keys.shift()}
                  type="button"
                  value={item}
                  onClick={(event) => {
                    setSelection(event.target.value);
                    showDropdown(false);
                  }}
                />
              )
            );
          })}
        </div>
      )}
    </div>
  );
};
