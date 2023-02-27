const AddEntryButton = ({ customHandler, text, isDisabled }) => {
  return (
    <button
      type="button"
      className={`add-entry button ${isDisabled ? "disabled" : ""}`}
      aria-label="add-entry"
      onClick={customHandler}
    >
      <span className="add-entry__circle">+</span>
      <span className="add-entry__text">{text}</span>
    </button>
  );
};

const NextSectionButton = ({ customHandler, text }) => {
  return (
    <button
      type="submit"
      className="next-section button"
      aria-label="next-section"
      onClick={customHandler}
    >
      {text ? text.toUpperCase() : "MOVE ON TO THE NEXT SECTION"}
    </button>
  );
};

const SkipSectionButton = ({ customHandler, text }) => {
  return (
    <button
      type="submit"
      className="skip-section button"
      aria-label="skip-section"
      onClick={customHandler}
    >
      {text ? text : "I'D LIKE TO SKIP THIS SECTION"}
    </button>
  );
};

const SaveReviewedSectionButton = ({ customHandler }) => {
  return (
    <button
      type="submit"
      className="save-reviewed-section button"
      aria-label="save-reviewed-section"
      onClick={customHandler}
    >
      Save reviewed section
    </button>
  );
};

export {
  AddEntryButton,
  NextSectionButton,
  SkipSectionButton,
  SaveReviewedSectionButton,
};
