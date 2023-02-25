const CounterBox = ({ currentNumber, currentSectionName }) => {
  return (
    <div className="counter-box">
      <div className="counter">
        <span className="counter-number">{currentNumber}</span>
      </div>
      <span className="counter-title">
        {currentSectionName === "GeneralInformation"
          ? "GENERAL INFORMATION"
          : currentSectionName === "SelectionMenu"
          ? "SELECTION MENU"
          : currentSectionName.toUpperCase()}
      </span>
    </div>
  );
};

export default CounterBox;
