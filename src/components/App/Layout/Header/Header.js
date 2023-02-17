import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header = ({ currentSection, darkThemeEnabled }) => {
  const backgroundImage = require(`../../../assets/backgrounds/${currentSection}_${
    darkThemeEnabled ? "dark" : "light"
  }.jpg`);
  const iconSrc = require(`../../../assets/header-icons/${currentSection}.svg`);
  const isMobile = useMediaQuery("(min-width:768px)");
  return (
    <header
      className="header"
      style={{ backgroundImage: isMobile ? `url(${backgroundImage})` : null }}
    >
      <img className="header-icon" alt="header icon" src={iconSrc.default} />
    </header>
  );
};

export default Header;
