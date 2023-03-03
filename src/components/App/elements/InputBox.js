import { useState } from "react";
import { useField, useFormikContext } from "formik";
import {
  useErrorStyling,
  useFieldUpdater,
  updateStylesOnBlur,
  updateStylesOnFocus,
} from "./handlers";
import Error from "./Error";

export const InputBox = ({ label, customChangeHandler, ...props }) => {
  const [field, meta] = useField(props);
  const [lastTouched, setLastTouched] = useState("");
  useErrorStyling(meta, lastTouched);

  return (
    <div className={`input-box ${props.name} field`} aria-label="input-box">
      <label
        className="input-box__label"
        aria-label="input-box__label"
        htmlFor={props.name}
      >
        {label}
      </label>
      <input
        aria-label="input-box__field"
        className="input-box__field"
        value={field.value}
        onBlur={(event) =>
          updateStylesOnBlur(event, field, meta, setLastTouched)
        }
        onChange={(event) => {
          customChangeHandler && customChangeHandler(event);
          field.onChange(event);
        }}
        onFocus={updateStylesOnFocus}
        {...props}
      />
      <Error meta={meta} />
    </div>
  );
};

export const InputBoxWithDropdown = ({ contents, ...props }) => {
  const [field] = useField(props);
  const [selection, setSelection] = useState(field.value);
  const [dropdown, showDropdown] = useState(false);
  const { setFieldValue } = useFormikContext();
  const showDropdownMatch = (event) => {
    showDropdown(true);
    setSelection(event.target.value);
  };

  useFieldUpdater(selection, props.name, setFieldValue);

  return (
    <div
      className="input-box-with-dropdown field"
      aria-label="input-box-with-dropdown"
    >
      <InputBox
        type="text"
        name={props.name}
        label={props.label}
        placeholder={props.placeholder}
        customChangeHandler={showDropdownMatch}
      />
      {dropdown && (
        <div className="dropdown" aria-label="dropdown">
          {contents.map((item) => {
            return (
              item.includes(selection) && (
                <input
                  className="dropdown-item"
                  aria-label="dropdown-item"
                  key={item}
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
