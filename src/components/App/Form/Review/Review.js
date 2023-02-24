import { createElement, React, useState } from "react";

const Review = ({
  formSectionNames,
  CurrentSection,
  dataHistory,
  displayDownloadPage,
  setCurrentSectionName,
  updateDataHistory,
}) => {
  const [sectionToReview, setSectionToReview] = useState("");
  const [reviewMode, setReviewMode] = useState(false);

  const setAndDisplaySectionToReview = (event) => {
    setSectionToReview(event.target.value);
    setCurrentSectionName(sectionToReview);
    setReviewMode(true);
  };

  const updateDataHistoryAndDisableReviewMode = (
    currentSectionName,
    dataToSave
  ) => {
    updateDataHistory(currentSectionName, dataToSave);
    setReviewMode(false);
    setSectionToReview("");
  };

  return (
    <main className="review" aria-label="review">
      <aside className="side-navbar" aria-label="side-navbar">
        <ul className="side-navbar__list" aria-label="side-navbar__list">
          {formSectionNames.map((sectionName) => {
            return (
              <li
                className="side-navbar__list-element"
                aria-label="side-navbar__list-element"
              >
                <input
                  type="submit"
                  value={sectionName}
                  onClick={setAndDisplaySectionToReview}
                />
              </li>
            );
          })}
        </ul>
      </aside>
      <div className="reviewed-section" aria-label="reviewed-section">
        {sectionToReview &&
          createElement(CurrentSection(sectionToReview), {
            currentSectionName: sectionToReview,
            dataHistory: dataHistory,
            updateDataHistoryAndDisableReviewMode:
              updateDataHistoryAndDisableReviewMode,
            reviewMode: reviewMode,
          })}
      </div>
      <button
        className="final-button"
        aria-label="final-button"
        onClick={displayDownloadPage}
      >
        Preview & download my CV
      </button>
    </main>
  );
};

export default Review;
