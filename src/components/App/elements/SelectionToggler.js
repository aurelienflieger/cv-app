const customData = {
  Picture: "own profile picture",
  Education: "past education",
  Career: "professional experience",
  Tools: "known tools & software",
  Languages: "mastered languages",
  Hobbies: "pastimes",
};

const SelectionToggler = ({
  currentImage,
  section,
  currentlySelected,
  selectSection,
}) => {
  return (
    <>
      <button
        className={`selection-toggler ${currentlySelected && "toggled"}`}
        aria-label="selection-toggler"
        onClick={selectSection}
      >
        <span
          className="selection-toggler__text"
          aria-label="selection-toggler__text"
        >{`I'd like to add my ${customData[section]}`}</span>
        <img
          className="selection-toggler__image"
          aria-label="selection-toggler__image"
          src={currentImage}
        />
      </button>
    </>
  );
};

export default SelectionToggler;
