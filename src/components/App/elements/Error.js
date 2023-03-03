const Error = ({ meta }) => {
  return (
    meta.touched &&
    meta.error && (
      <span className="error" aria-label="error">
        {meta.error}
      </span>
    )
  );
};

export default Error;
