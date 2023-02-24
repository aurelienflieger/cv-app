const SideImage = ({ backgroundImage }) => {
  return (
    <div
      className={`side-background-image`}
      aria-label="side-background-image"
      style={{
        backgroundImage: `url(${backgroundImage}`,
      }}
    />
  );
};

export default SideImage;
