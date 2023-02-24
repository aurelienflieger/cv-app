import { useField } from "formik";
import { generateUniqueKeys } from "../Form/shared-helpers";

const Select = ({ label, props }) => {
  const [field, meta] = useField(props);
  const keys = generateUniqueKeys(5);
  const options = ["Basic", "Limited", "Professional", "Expert", "Master"];
  return (
    <div className="select-input-box">
      <label htmlFor="select-input">{label}</label>

      <select
        className="select-input"
        name="select-input"
        {...field}
        {...props}
      >
        {options.map((option, index) => {
          return (
            <option value={`skill-level-${index + 1}`} key={keys.shift()}>
              {option}
            </option>
          );
        })}
      </select>

      {meta.touched && meta.error && (
        <span className="error">{meta.error}</span>
      )}
    </div>
  );
};

export default Select;
