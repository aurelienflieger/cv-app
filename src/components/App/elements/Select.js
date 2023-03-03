import { useField } from "formik";

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const options = ["--", "Basic", "Limited", "Professional", "Expert", "Master"];
  return (
    <div
      className={`select-input__box ${props.name} field`}
      aria-label="select-input__box"
    >
      <label
        className="select-input__label"
        aria-label="select-input__label"
        htmlFor="select-input"
      >
        {label}
      </label>

      <select
        className="select-input"
        aria-label="select-input"
        {...field}
        {...props}
      >
        {options.map((option) => {
          return (
            <option
              className="select-input__option"
              aria-label="select-input__option"
              value={option}
              key={option}
            >
              {option}
            </option>
          );
        })}
      </select>

      {meta.touched && meta.error && (
        <span className="error" aria-label="error">
          {meta.error}
        </span>
      )}
    </div>
  );
};

export default Select;
