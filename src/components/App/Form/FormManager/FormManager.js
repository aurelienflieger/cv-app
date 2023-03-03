import { createElement, React, useState } from "react";
import Frame from "../../Frame/Frame";
import HookAndCounter from "../../elements/HookAndCounter";
import Information from "../Information/Information";
import Picture from "../Picture/Picture";
import MultipleEntries from "../MultipleEntries/MultipleEntries";
import Selection from "../Selection/Selection";
import Review from "../Review/Review";
import Download from "../Download/Download";

const sectionNames = {
  mandatory: ["Information", "Selection", "Review", "Download"],
  optional: ["Picture", "Career", "Education", "Tools", "Hobbies", "Languages"],
  review: [
    "Information",
    "Picture",
    "Career",
    "Education",
    "Tools",
    "Hobbies",
    "Languages",
  ],
};

const FormManager = () => {
  const [currentSectionData, setCurrentSectionData] = useState({
    name: "Information",
    number: 1,
  });
  const [dataHistory, setDataHistory] = useState("");
  const [mandatorySections, setMandatorySections] = useState([
    ...sectionNames.mandatory,
  ]);
  const [optionalSections, setOptionalSections] = useState([
    ...sectionNames.optional,
  ]);
  const [reviewSections] = useState([...sectionNames.review]);

  const ReviewedComponent = ({ reviewedSection }) => {
    const props = {
      currentSectionName: reviewedSection,
      dataHistory: dataHistory[reviewedSection],
      eventHandlers: {
        displayNextPage,
        handleSubmission,
        setOptionalSections,
      },
      optionalSections: [...sectionNames.optional],
      optionalSectionsToSelect: optionalSections,
      reviewSections: reviewSections,
      reviewMode: true,
    };

    const specificSections = {
      Information,
      Selection,
      Picture,
      Review,
      Download,
    };
    const currentTag = specificSections[reviewedSection] || MultipleEntries;
    return createElement(currentTag, {
      ...props,
    });
  };

  const CurrentComponent = () => {
    const props = {
      currentSectionName: currentSectionData.name,
      eventHandlers: {
        displayNextPage,
        handleSubmission,
        setOptionalSections,
      },
      optionalSections: [...sectionNames.optional],
      optionalSectionsToSelect: optionalSections,
      reviewSections: reviewSections,
      ReviewedComponent: ReviewedComponent,
    };

    const specificSections = {
      Information,
      Selection,
      Picture,
      Review,
      Download,
    };
    const currentTag =
      specificSections[currentSectionData.name] || MultipleEntries;

    return createElement(currentTag, {
      ...props,
    });
  };

  function displayNextPage(context) {
    switch (context) {
      case "Mandatory": {
        setCurrentSectionData((prev) => {
          return { name: mandatorySections[1], number: prev.number + 1 };
        });
        setMandatorySections((prev) => prev.slice(1));
        break;
      }
      case "Selection": {
        setMandatorySections((prev) => prev.slice(1));
        setCurrentSectionData((prev) => {
          return { name: optionalSections[0], number: prev.number + 1 };
        });
        break;
      }
      case "Optional": {
        if (optionalSections.length === 1) {
          setCurrentSectionData((prev) => {
            return { name: mandatorySections[0], number: prev.number + 1 };
          });
          setMandatorySections((prev) => prev.slice(1));
          return;
        }
        setCurrentSectionData((prev) => {
          return { name: optionalSections[1], number: prev.number + 1 };
        });
        setOptionalSections((prev) => prev.slice(1));
        break;
      }
      case "SkipSelectionOrReview": {
        setCurrentSectionData((prev) => {
          return { name: mandatorySections[1], number: prev.number + 1 };
        });
        setMandatorySections((prev) => prev.slice(1));
        break;
      }
      default:
        return "This context is unknown.";
    }
  }

  function handleSubmission(submitted, context) {
    const { currentSectionName, values } = submitted;
    const { isReviewMode, isOptionalSection } = context;
    setDataHistory((history) => ({
      ...history,
      [currentSectionName]: values,
    }));
    if (isReviewMode) return;
    displayNextPage(isOptionalSection ? "Optional" : "Mandatory");
  }

  return (
    <Frame currentSectionName={currentSectionData.name}>
      <div className="form-manager" aria-label="form-manager">
        <HookAndCounter currentData={currentSectionData} />
        <CurrentComponent key={currentSectionData.name} />
      </div>
    </Frame>
  );
};

export default FormManager;
