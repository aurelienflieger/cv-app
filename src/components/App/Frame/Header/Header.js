import React from "react";

const Header = ({ backgroundImage, currentSectionName, isMidScreen }) => {
  const iconSrc = require(`../../../../assets/header-icons/${currentSectionName}_default.png`);

  return (
    <header
      className={`header ${currentSectionName}`}
      style={{
        backgroundImage: isMidScreen ? `url(${backgroundImage})` : null,
      }}
    >
      <img className="header-icon" alt="header icon" src={iconSrc} />
    </header>
  );
};

export default Header;
