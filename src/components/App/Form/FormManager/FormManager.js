import { createElement, React, useState } from "react";
import Frame from "../../Frame/Frame";
import CounterBox from "../../elements/CounterBox";
import HookText from "../../elements/HookText";
import GeneralInformation from "../GeneralInformation/GeneralInformation";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import MultipleEntries from "../MultipleEntries/MultipleEntries";
import SelectionMenu from "../SelectionMenu/SelectionMenu";
import Review from "../Review/Review";
import Download from "../Download/Download";

const FormManager = () => {
  const formSectionNames = [
    "GeneralInformation",
    "ProfilePicture",
    "Career",
    "Education",
    "Hobbies",
    "Tools",
    "Languages",
  ];

  const [optionalSections, setOptionalSections] = useState([
    ...formSectionNames.slice(1),
  ]);
  const [currentSectionName, setCurrentSectionName] =
    useState("GeneralInformation");
  const [currentNumber, setCurrentNumber] = useState(1);
  const [dataHistory, setDataHistory] = useState({});
  const [generalInformationPage, setGeneralInformationPageDisplay] =
    useState(true);
  const [selectionPage, setSelectionPageDisplay] = useState(false);
  const [sectionPage, setSectionPageDisplay] = useState(false);
  const [reviewPage, setReviewPageDisplay] = useState(false);
  const [downloadPage, setDownloadPageDisplay] = useState(false);

  const CurrentSection = (currentSectionName) => {
    const sections = {
      GeneralInformation,
      ProfilePicture,
    };
    return sections[currentSectionName] || MultipleEntries;
  };

  const closeSelectionMenuAndDisplaySections = () => {
    setSelectionPageDisplay(false);
    setSectionPageDisplay(true);
    setCurrentSectionName(optionalSections[0]);
    setCurrentNumber((previousNumber) => previousNumber + 1);
  };

  const displayNextPage = () => {
    if (!optionalSections.length) return displayReviewPage();
    setOptionalSections((sections) => {
      const withoutCurrentSection = sections.filter(
        (section) => section !== section[0]
      );
      return [withoutCurrentSection];
    });
    setCurrentNumber((previousNumber) => previousNumber + 1);
  };

  const displayDownloadPage = () => {
    setReviewPageDisplay(false);
    setDownloadPageDisplay(true);
    setCurrentSectionName("Download");
    setCurrentNumber((previousNumber) => previousNumber + 1);
  };

  const displayReviewPage = () => {
    setSectionPageDisplay(false);
    setReviewPageDisplay(true);
    setCurrentNumber((previousNumber) => previousNumber + 1);
  };

  const displaySelectionPage = () => {
    setGeneralInformationPageDisplay(false);
    setSelectionPageDisplay(true);
    setCurrentNumber((previousNumber) => previousNumber + 1);
  };

  const updateDataHistory = (currentSectionName, dataToSave) => {
    setDataHistory((history) => {
      return { ...history, [currentSectionName]: dataToSave };
    });
  };

  const updateDataHistoryAndDisplayNextPage = (
    currentSectionName,
    dataToSave
  ) => {
    if (!optionalSections.length)
      return updateDataHistoryAndDisplayReviewPage(
        currentSectionName,
        dataToSave
      );
    updateDataHistory(currentSectionName, dataToSave);
    displayNextPage();
  };

  const updateDataHistoryAndDisplayReviewPage = (
    currentSectionName,
    dataToSave
  ) => {
    updateDataHistory(currentSectionName, dataToSave);
    displayReviewPage();
    setCurrentSectionName("Review");
  };

  const updateDataHistoryAndDisplaySelectionMenu = (
    currentSectionName,
    dataToSave
  ) => {
    updateDataHistory(currentSectionName, dataToSave);
    displaySelectionPage();
    setCurrentSectionName("SelectionMenu");
  };

  return (
    <Frame
      currentSectionName={currentSectionName}
    >
      <div
        className={`form-manager`}
        aria-label="form-manager"
      >
        <div className="hook-and-counter">
          <HookText currentSectionName={currentSectionName} />
          <CounterBox
            currentNumber={currentNumber}
            currentSectionName={currentSectionName}
          />
        </div>
        {generalInformationPage && (
          <GeneralInformation
            updateDataHistoryAndDisplaySelectionMenu={
              updateDataHistoryAndDisplaySelectionMenu
            }
          />
        )}

        {selectionPage && (
          <SelectionMenu
            closeSelectionMenuAndDisplaySections={
              closeSelectionMenuAndDisplaySections
            }
            optionalSections={optionalSections}
            setOptionalSections={setOptionalSections}
          />
        )}

        {sectionPage &&
          createElement(CurrentSection(currentSectionName), {
            currentSectionName: currentSectionName,
            displayNextPage: displayNextPage,
            updateDataHistoryAndDisplayNextPage:
              updateDataHistoryAndDisplayNextPage,
          })}

        {reviewPage && (
          <Review
            formSectionNames={formSectionNames}
            dataHistory={dataHistory}
            CurrentSection={CurrentSection}
            displayDownloadPage={displayDownloadPage}
            setCurrentSectionName={setCurrentSectionName}
            updateDataHistory={updateDataHistory}
          />
        )}

        {downloadPage && <Download />}
      </div>
    </Frame>
  );
};

export default FormManager;
