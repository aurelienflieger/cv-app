const SelectionToggler = ({
  currentImage,
  section,
  currentlySelected,
  selectSectionAndUpdateImage,
}) => {
  const lowercasedSection = section[0].toLowerCase() + section.slice(1);
  return (
    <>
      <button
        className={`selection-toggler ${currentlySelected && "toggled"}`}
        aria-label="selection-toggler"
        onClick={selectSectionAndUpdateImage}
      >
        <span
          className="selection-toggler__text"
          aria-label="selection-toggler__text"
        >{`I'd like to add my ${lowercasedSection}`}</span>
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
