const customData = {
  Information: {
    counter: "BASIC INFORMATION",
    hook: "Let's get to know you a bit better...",
  },
  Career: {
    counter: "WORK EXPERIENCE",
    hook: "It's time to tackle your career so far.",
  },
  Selection: {
    counter: "OPTIONAL SECTIONS",
    hook: "Which piece of information would you like to add?",
  },
  Education: {
    counter: "EDUCATION",
    hook: "We'll go over your studies together.",
  },
  Picture: {
    counter: "PROFILE PICTURE",
    hook: "Let your favorite selfie shine.",
  },
  Hobbies: {
    counter: "HOBBIES",
    hook: "What are your passions on your free time?",
  },
  Tools: {
    counter: "TOOLS & SOFTWARE",
    hook: "Share the tools you're familiar with.",
  },
  Languages: {
    counter: "LANGUAGES",
    hook: "Tell us about your mother tongue and any foreign one.",
  },
  Review: {
    counter: "CONTENTS REVIEW",
    hook: "Is there anything you'd like to change?",
  },
  Download: {
    counter: "CV DOWNLOAD",
    hook: "Your CV is ready to be sent to your future employer.",
  },
};

const HookText = ({ customHook }) => {
  return (
    <h1 className="hook-text" aria-label="hook-text">
      {customHook}
    </h1>
  );
};

const CounterBox = ({ currentNumber, customCounter }) => {
  return (
    <div className="counter-box" aria-label="counter-box">
      <div className="counter" aria-label="counter">
        <span className="counter-number" aria-label="counter-number">
          {currentNumber}
        </span>
      </div>
      <span className="counter-title" aria-label="counter-title">
        {customCounter}
      </span>
    </div>
  );
};

const HookAndCounter = ({ currentData }) => {
  const { name, number } = currentData;
  const { counter, hook } = customData[name];
  return (
    <div className="hook-and-counter" aria-label="hook-and-counter">
      <HookText customHook={hook} />
      <CounterBox currentNumber={number} customCounter={counter} />
    </div>
  );
};

export default HookAndCounter;
