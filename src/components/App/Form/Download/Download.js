import CV from "../../CV/CV";
import CVMock from "./CVMock";
import { useMediaQuery } from "@mui/material";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Download = ({ dataHistory }) => {
  const isSmallScreen = useMediaQuery("(max-width:650px)");
  const ref = useRef(null);

  const toggleShadows = () => {
    document.querySelector(".CV").classList.toggle("shadowed");
    document
      .querySelector(".CV__eye-catcher__photo ")
      .classList.toggle("shadowed");
  };

  const downloadCV = async () => {
    toggleShadows();
    const canvas = await html2canvas(ref.current, { scale: 5 });
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const width = pdf.internal.pageSize.getWidth();
    const height = (imgProperties.height * width) / imgProperties.width;
    pdf.addImage(data, "PNG", 0, 0, width, height);
    pdf.save("myCV.pdf");
    toggleShadows();
  };

  return (
    <div className="section download" aria-label="download">
      {isSmallScreen && <CVMock />}
      {isSmallScreen &&
        document.querySelector("body").classList.add("no-overflow")}
      <CV dataHistory={dataHistory} ref={ref} />
      <button
        type="submit"
        className="trigger-download button"
        aria-label="trigger-download"
        onClick={() => downloadCV()}
      >
        DOWNLOAD YOUR CURRICULUM VITAE
      </button>
    </div>
  );
};

export default Download;
