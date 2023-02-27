import { useMemo } from "react";
import { AddEntryButton, NextSectionButton } from "../../elements/Buttons";
import SelectionToggler from "../../elements/SelectionToggler";
import { generateUniqueKeys } from "../shared-helpers";

const SelectionMenu = ({
  closeSelectionMenuAndDisplaySections,
  displayReviewPage,
  immutableSectionsForMapping,
  optionalSections,
  setOptionalSections,
}) => {
  const keys = generateUniqueKeys(10);

  const getCurrentImage = (section) => {
    const image = require(`../../../../assets/header-icons/${section}_${
      isSelected(section) ? "selected" : "default"
    }.png`);
    return image;
  };

  const isSelected = (currentSectionName) =>
    !!optionalSections.includes(currentSectionName);

  const selectSection = (currentSectionName) => {
    setOptionalSections((pastSections) => {
      if (isSelected(currentSectionName)) {
        const withoutCurrentSection = pastSections.filter(
          (section) => section !== currentSectionName
        );
        return [...withoutCurrentSection];
      } else {
        return [...pastSections, currentSectionName];
      }
    });
  };

  return (
    <main className="selection-menu">
      {immutableSectionsForMapping.map((section) => (
        <SelectionToggler
          currentImage={getCurrentImage(section)}
          currentlySelected={isSelected(section)}
          section={section}
          selectSection={() => selectSection(section)}
          key={keys.shift()}
        />
      ))}
      <AddEntryButton customHandler={closeSelectionMenuAndDisplaySections} text='Add these sections to your CV' />
      <NextSectionButton
        customHandler={displayReviewPage}
        text={`No, I'd just like to review my CV.`}
      />
    </main>
  );
};

export default SelectionMenu;
