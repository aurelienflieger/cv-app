const AddEntryButton = ({ customHandler }) => {
  return (
    <button
      className="add-entry"
      aria-label="add-entry"
      onClick={customHandler}
    >
      Add a new entry
    </button>
  );
};

const NextSectionButton = ({ customHandler, text }) => {
  return (
    <button
      className="next-section"
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
      className="skip-section"
      aria-label="skip-section"
      onClick={customHandler}
    >
      {text ? text : "I'd like to skip this section"}
    </button>
  );
};

const SaveReviewedSectionButton = ({ customHandler }) => {
  return (
    <button
      className="save-reviewed-section"
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
