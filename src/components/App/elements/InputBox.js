import { useState } from "react";
import { useField } from "formik";
import { generateUniqueKeys } from "../Form/shared-helpers";

export const InputBox = ({ label, customChangeHandler, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="input-box">
      <label className="input-box__label" htmlFor={props.name}>
        {label}
      </label>
      <input
        aria-label={props.name}
        className="input-box__field"
        value={field.value}
        onBlur={props.handleBlur}
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
  const [selection, setSelection] = useState("");
  const [dropdown, showDropdown] = useState(false);
  const showDropdownMatch = (event) => {
    showDropdown(true);
    setSelection(event.target.value);
  };
  const keys = generateUniqueKeys(300);
  const [field] = useField(props);

  return (
    <div className="input-box-with-dropdown">
      <InputBox
        type="text"
        name={props.name}
        label={props.label}
        placeholder={props.placeholder}
        customChangeHandler={showDropdownMatch}
        value={selection || field.value}
      />
      {dropdown && (
        <div className="dropdown">
          {contents.map((item, index) => {
            return (
              item.includes(selection) && (
                <input
                  className="dropdown-item"
                  key={keys[index]}
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
