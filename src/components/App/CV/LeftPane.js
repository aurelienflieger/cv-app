import React from "react";
import { localize } from "../Form/shared-helpers";

const Entry = ({ savedEntry }) => {
  return (
    <div className="CV__entry-group" key={JSON.stringify(savedEntry)}>
      <p className="CV__entry-title">
        {`${savedEntry.context} @ ${savedEntry.establishment}`}
      </p>
      <p className="CV__entry-date">{`${localize(
        savedEntry.startDate
      )} to ${localize(savedEntry.endDate)}`}</p>
      <p className="CV__entry-text">{`${savedEntry.description}`}</p>
    </div>
  );
};

const Section = ({ sectionName, dataHistory }) => {
  return (
    <div className="CV__left-pane__section" key={JSON.stringify(sectionName)}>
      <h3 className="CV__section-title">{sectionName}</h3>
      <div className="CV__entry-and-bar-group">
        <span className="CV__bar" />
        <div className="CV__entries">
          {!!dataHistory &&
            !!dataHistory[sectionName] &&
            dataHistory[sectionName].map((savedEntry) => (
              <Entry savedEntry={savedEntry} key={JSON.stringify(savedEntry)} />
            ))}
        </div>
      </div>
    </div>
  );
};

const LocalizationIcon = () => {
  return (
    <svg
      className="CV__eye-catcher__localization-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="243.285"
      height="346.327"
      version="1.1"
      viewBox="0 0 64.369 91.632"
    >
      <g transform="translate(-136.222 -22.38)">
        <path
          stroke="#000"
          strokeWidth="0.953"
          d="M168.41 22.856a32.573 32.573 0 00-4.843.364 31.79 31.79 0 00-6.084 1.553 31.494 31.494 0 00-6.828 3.482 31.657 31.657 0 00-6.733 6.115 31.685 31.685 0 00-3.406 5.053 31.536 31.536 0 00-3.451 10.299 31.96 31.96 0 00-.323 3.206c-.025.503-.056 1.01-.038 1.519.003.078.218.73.632 2.025a270.176 270.176 0 003.274 9.591 278.69 278.69 0 001.627 4.382 260.849 260.849 0 002.882 7.238 226.648 226.648 0 002.188 5.079 195.362 195.362 0 002.359 5.13c.406.852.82 1.7 1.239 2.543.419.842.844 1.679 1.275 2.507.432.827.87 1.646 1.312 2.454.444.807.892 1.603 1.347 2.385.454.782.914 1.55 1.378 2.3.465.752.935 1.485 1.41 2.2.474.714.954 1.408 1.439 2.08a55.425 55.425 0 002.21 2.866 42.786 42.786 0 001.506 1.715 34.316 34.316 0 001.529 1.54 24.239 24.239 0 002.335 1.947c.262.19.526.372.79.544.263.173.527.335.793.488.265-.153.53-.315.794-.488a22.21 22.21 0 001.58-1.142 25.048 25.048 0 001.567-1.349 31.704 31.704 0 001.55-1.54 39.678 39.678 0 001.53-1.715 56.881 56.881 0 002.255-2.865c.496-.673.987-1.367 1.473-2.081a81.42 81.42 0 001.444-2.2 95.49 95.49 0 001.412-2.3c.465-.782.925-1.578 1.379-2.385.453-.808.901-1.627 1.342-2.454.441-.828.876-1.665 1.304-2.507a174.243 174.243 0 003.65-7.673 203.558 203.558 0 002.191-5.08 260.849 260.849 0 002.883-7.238 278.79 278.79 0 004.901-13.972c.413-1.291.607-1.94.63-2.019a32.19 32.19 0 00-.639-6.296 31.667 31.667 0 00-1.841-5.96 31.53 31.53 0 00-5.732-8.976 31.722 31.722 0 00-8.35-6.55 31.529 31.529 0 00-10.299-3.451 31.972 31.972 0 00-3.206-.323 32.572 32.572 0 00-1.637-.041zm.081 15.474a12.475 12.475 0 0112.476 12.476 12.475 12.475 0 01-12.476 12.475 12.475 12.475 0 01-12.475-12.475A12.475 12.475 0 01168.49 38.33z"
        ></path>
      </g>
    </svg>
  );
};

const EyeCatcher = ({ dataHistory }) => {
  const { Information, Picture } = dataHistory;
  const defaultPicture = require("../../../assets/cv/default-user.jpg");
  return (
    <div className="CV__eye-catcher">
      <img
        alt="default"
        className="CV__eye-catcher__photo shadowed"
        src={Picture || defaultPicture}
      />
      <div className="CV__eye-catcher__right-group">
        <h1 className="CV__eye-catcher__name">
          {`${Information.firstName} ${Information.lastName}`}
        </h1>
        <span className="CV__eye-catcher__work-field">
          {Information.workField}
        </span>
        <div className="CV__eye-catcher__localization">
          <LocalizationIcon />
          <span className="CV__eye-catcher__localization-text">
            {`${Information.city}, ${Information.country}`}
          </span>
        </div>
      </div>
    </div>
  );
};

const Profile = ({ dataHistory }) => {
  const { Information } = dataHistory;
  return (
    <div className="CV__profile CV__left-pane__section">
      <h3 className="CV__section-title">Profile</h3>
      <div className="CV__entry-and-bar-group">
        <span className="CV__bar" />
        <p className="CV__entry-text">{Information.introduction}</p>
      </div>
    </div>
  );
};

const Career = ({ dataHistory }) => {
  return <Section dataHistory={dataHistory} sectionName="Career" />;
};

const Education = ({ dataHistory }) => {
  return <Section dataHistory={dataHistory} sectionName="Education" />;
};

const LeftPane = ({ dataHistory }) => {
  return (
    <div className="CV__left-pane">
      <EyeCatcher dataHistory={dataHistory} />
      <Profile dataHistory={dataHistory} />
      <Career dataHistory={dataHistory} />
      <Education dataHistory={dataHistory} />
    </div>
  );
};

export default LeftPane;
