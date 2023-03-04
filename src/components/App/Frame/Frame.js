import Header from "./Header/Header";
import SideImage from "./SideImage/SideImage";
import { useMediaQuery } from "@mui/material";


const Frame = ({ currentSectionName, children }) => {
  const sideImageDisplayed = currentSectionName !== "Review";
  const backgroundImage = require(`../../../assets/backgrounds/${currentSectionName}_light.jpg`);
  const isMidScreen = useMediaQuery("(max-width:1200px)");


  return (
    <div className="frame" aria-label="frame">
      <Header
        backgroundImage={backgroundImage}
        currentSectionName={currentSectionName}
        isMidScreen={isMidScreen}
      />
      <div
        className={`section-and-side section-and-side ${currentSectionName}`}
      >
        {children}
        {!isMidScreen && sideImageDisplayed && (
          <SideImage
            backgroundImage={backgroundImage}
            currentSectionName={currentSectionName}
          />
        )}
      </div>
    </div>
  );
};

export default Frame;
