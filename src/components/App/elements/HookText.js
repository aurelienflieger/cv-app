const HookText = ({ currentSectionName }) => {
  const texts = {
    GeneralInformation: `Let's get to know you better...`,
    Career: `It's time to tackle your work experience.`,
    Education: `We'll go over your past studies together.`,
    ProfilePicture: `Why not upload your favorite selfie?`,
  };
  return (
    <h1 className="hook-text" aria-label="hook text">
      {texts[currentSectionName]}
    </h1>
  );
};

export default HookText;
