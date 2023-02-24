import React from "react";

const Header = ({ backgroundImage, currentSectionName, isSmallScreen }) => {
  const iconSrc = require(`../../../../assets/header-icons/${currentSectionName}_default.png`);

  return (
    <header
      className="header"
      style={{
        backgroundImage: isSmallScreen ? backgroundImage : null,
      }}
    >
      <img className="header-icon" alt="header icon" src={iconSrc} />
    </header>
  );
};

export default Header;
