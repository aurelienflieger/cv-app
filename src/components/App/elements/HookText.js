const HookText = ({ currentSectionName }) => {
  const texts = {
    GeneralInformation: `Let's get to know you better...`,
    Education: `We'll go over your past studies together`,
  };
  return (
    <h1 className="hook-text" aria-label="hook text">
      {texts[currentSectionName]}
    </h1>
  );
};

export default HookText;
