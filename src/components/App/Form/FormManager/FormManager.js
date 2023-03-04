import { React, useState, useEffect } from "react";
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

const FormManager = ({ isSmallScreen }) => {
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
  useEffect(() => console.log(mandatorySections));

  function DynamicComponent({ sectionName, additionalProps }) {
    const props = {
      currentSectionName: sectionName,
      dataHistory: dataHistory,
      sectionHistory: dataHistory[sectionName],
      eventHandlers: {
        displayNextPage,
        handleSubmission,
        setOptionalSections,
      },
      isSmallScreen: isSmallScreen,
      optionalSections: [...sectionNames.optional],
      optionalSectionsToSelect: optionalSections,
      reviewSections: reviewSections,
      ...additionalProps,
    };

    const specificSections = {
      Information,
      Selection,
      Picture,
      Review,
      Download,
    };
    const CurrentTag = specificSections[sectionName] || MultipleEntries;
    return <CurrentTag {...props} />;
  }

  function displayNextPage(context, optionalIndex) {
    const action = {
      toMandatoryPage: () => displayNextMandatoryPage(optionalIndex),
      toFirstOptionalPage: () => displayFirstOptionalPage(),
      toNextOptionalPage: () => displayNextOptionalPage(),
    };
    return action[context]();
  }

  function displayFirstOptionalPage() {
    setMandatorySections((prev) => prev.slice(1));
    setCurrentSectionData((prev) => {
      return { name: optionalSections[0], number: prev.number + 1 };
    });
  }

  function displayNextMandatoryPage(index) {
    setCurrentSectionData((prev) => {
      return { name: mandatorySections[index], number: prev.number + 1 };
    });
    setMandatorySections((prev) => prev.slice(1));
  }

  function displayNextOptionalPage() {
    if (optionalSections.length === 1) return displayNextMandatoryPage(0);
    setCurrentSectionData((prev) => {
      return { name: optionalSections[1], number: prev.number + 1 };
    });
    setOptionalSections((prev) => prev.slice(1));
  }

  function handleSubmission(submitted, context) {
    const { currentSectionName, values } = submitted;
    const { isReviewMode, isOptionalSection } = context;
    setDataHistory((history) => ({
      ...history,
      [currentSectionName]: values,
    }));
    if (isReviewMode) return;
    displayNextPage(
      isOptionalSection ? "toNextOptionalPage" : "toMandatoryPage",
      1
    );
  }

  return (
    <Frame
      currentSectionName={currentSectionData.name}
      isSmallScreen={isSmallScreen}
    >
      <div className="form-manager" aria-label="form-manager">
        <HookAndCounter currentData={currentSectionData} />
        <DynamicComponent
          additionalProps={{ DynamicComponent }}
          sectionName={currentSectionData.name}
        />
      </div>
    </Frame>
  );
};

export default FormManager;
