import { AddEntryButton, NextSectionButton } from "../../elements/Buttons";
import SelectionToggler from "../../elements/SelectionToggler";
import { generateUniqueKeys } from "../shared-helpers";

const SelectionMenu = ({
  closeSelectionMenuAndDisplaySections,
  displayReviewPage,
  optionalSections,
  setOptionalSections,
}) => {
  const keys = generateUniqueKeys(10);
  const isSelected = (currentSectionName) =>
    !!optionalSections.includes(currentSectionName);

  const selectSection = (currentSectionName) => {
    setOptionalSections((pastSections) => {
      if (isSelected(currentSectionName)) {
        const withoutCurrentSection = pastSections.filter(
          (section) => section !== currentSectionName
        );
        return [withoutCurrentSection];
      } else {
        return [...pastSections, currentSectionName];
      }
    });
  };

  return (
    <main className="selection-menu">
      {optionalSections.map((section) => (
        <SelectionToggler
          currentImage={require(`../../../../assets/header-icons/${section}_${
            isSelected(section) ? "selected" : "default"
          }`)}
          currentlySelected={isSelected(section)}
          section={section}
          selectSection={() => selectSection(section)}
          key={keys.shift()}
        />
      ))}
      <AddEntryButton customHandler={closeSelectionMenuAndDisplaySections} />
      <NextSectionButton
        customHandler={displayReviewPage}
        text={`No, I'd just like to review my CV.`}
      />
    </main>
  );
};

export default SelectionMenu;
