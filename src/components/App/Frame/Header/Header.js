import React from "react";

const Header = ({ backgroundImage, currentSectionName, isSmallScreen }) => {
  const iconSrc = require(`../../../../assets/header-icons/${currentSectionName}_default.png`);

  return (
    <header
      className={`header header_${currentSectionName}`}
      style={{
        backgroundImage: isSmallScreen ? `url(${backgroundImage})` : null,
      }}
    >
      <img className="header-icon" alt="header icon" src={iconSrc} />
    </header>
  );
};

export default Header;
