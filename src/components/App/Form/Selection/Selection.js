import { AddEntryButton, NextSectionButton } from "../../elements/Buttons";
import { getCurrentImage } from "../shared-helpers";
import SelectionToggler from "../../elements/SelectionToggler";

const Selection = ({
  currentSectionName,
  eventHandlers,
  optionalSections,
  optionalSectionsToSelect,
}) => {
  const { displayNextPage, setOptionalSections } = eventHandlers;

  const isSelected = (toggledSection) =>
    !!optionalSectionsToSelect.includes(toggledSection);

  const selectSection = (toggledSection) => {
    setOptionalSections((pastSections) => {
      if (isSelected(toggledSection)) {
        const withoutToggledSection = pastSections.filter(
          (section) => section !== toggledSection
        );
        return [...withoutToggledSection];
      } else {
        return [...pastSections, toggledSection];
      }
    });
  };

  return (
    <main className={`section ${currentSectionName}`}>
      {optionalSections.map((section) => (
        <SelectionToggler
          currentImage={getCurrentImage(section, isSelected(section))}
          currentlySelected={isSelected(section)}
          section={section}
          selectSection={() => selectSection(section)}
          key={section}
        />
      ))}
      <AddEntryButton
        customHandler={() => displayNextPage("toFirstOptionalPage")}
        text="Add these sections to your CV"
      />
      <NextSectionButton
        customHandler={() => displayNextPage("toMandatoryPage", 1)}
        text={`No, I'd just like to review my CV.`}
      />
    </main>
  );
};

export default Selection;
