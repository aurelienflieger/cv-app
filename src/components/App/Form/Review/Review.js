import { React, useState } from "react";
import { getCurrentImage } from "../shared-helpers";
import DefaultView from "./DefaultView";

const Review = ({ eventHandlers, reviewSections, DynamicComponent }) => {
  const [selectedSection, setSelectedSection] = useState("");
  const [currentImage, setCurrentImage] = useState({});
  const { displayNextPage } = eventHandlers;

  return (
    <main className="section review" aria-label="review">
      <aside className="side-navbar" aria-label="side-navbar">
        <ul className="side-navbar__list" aria-label="side-navbar__list">
          {reviewSections.map((sectionName) => {
            return (
              <li
                className={`side-navbar__list-element ${
                  selectedSection === sectionName ? "selected" : ""
                }`}
                aria-label="side-navbar__list-element"
                onMouseOver={() => {
                  setCurrentImage((prev) => ({
                    ...prev,
                    [sectionName]: getCurrentImage(sectionName, true),
                  }));
                }}
                onMouseLeave={() => {
                  if (selectedSection !== sectionName) {
                    setCurrentImage((prev) => ({
                      ...prev,
                      [sectionName]: getCurrentImage(sectionName, false),
                    }));
                  }
                }}
                onClick={() => {
                  setSelectedSection(sectionName);
                  setCurrentImage({});
                }}
                key={sectionName}
              >
                <img
                  className="selection-toggler__image"
                  aria-label="selection-toggler__image"
                  alt="current-section"
                  src={
                    currentImage[sectionName] ||
                    getCurrentImage(
                      sectionName,
                      !!(selectedSection === sectionName)
                    )
                  }
                />
                <input
                  className="list-element__section-name"
                  aria-label="section-name"
                  type="submit"
                  value={sectionName}
                />
              </li>
            );
          })}
        </ul>
      </aside>
      <div className="reviewed-section-box" aria-label="reviewed-section">
        {selectedSection ? (
          <DynamicComponent
            additionalProps={{ reviewMode: true }}
            sectionName={selectedSection}
            key={selectedSection}
          />
        ) : (
          <div className="default-view">
            <DefaultView />
            <span className="default-text">
              You have not selected any section for review yet.
            </span>
          </div>
        )}
        <button
          className="button download"
          aria-label="download"
          onClick={() => {
            displayNextPage("toMandatoryPage", 1);
          }}
        >
          Preview & download my CV
        </button>
      </div>
    </main>
  );
};

export default Review;
