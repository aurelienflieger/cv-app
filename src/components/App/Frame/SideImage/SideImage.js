const SideImage = ({ backgroundImage, currentSectionName }) => {
  return (
    <div
      className={`side-image side-image_${currentSectionName}`}
      aria-label="side-image"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    />
  );
};

export default SideImage;
