import React from "react";
import { localize } from "../Form/shared-helpers";

const Details = ({ dataHistory }) => {
  const { Information } = dataHistory;
  const separatedEmail = Information.email.split("@");
  return (
    <div className="CV__right-pane__section">
      <h3 className="CV__section-title">Details</h3>
      <div className="CV__details-group">
        <p className="CV__entry-text">Born {localize(Information.birthDate)}</p>
        <p className="CV__entry-text">{Information.home}</p>
        <p className="CV__entry-text">{Information.city}</p>
        <p className="CV__entry-text">{Information.phone}</p>
        <p className="CV__entry-text">{`${separatedEmail[0]}@`}</p>
        <p className="CV__entry-text">{`${separatedEmail[1]}`}</p>

      </div>
    </div>
  );
};

const Skill = ({ dataHistory, sectionName }) => {
  const level = {
    Basic: 1,
    Limited: 2,
    Professional: 3,
    Expert: 4,
    Master: 5,
  };
  return (
    <div className="CV__right-pane__section">
      <h3 className="CV__section-title">{sectionName}</h3>
      <div className="CV__skills-group">
        {!!dataHistory &&
          !!dataHistory[sectionName] &&
          dataHistory[sectionName].map((section) => {
            return (
              <div className="CV__name-and-skill" key={JSON.stringify(section)}>
                <p className="CV__entry-text">{section.extra}</p>
                <span
                  className={`progress-bar level-${level[section.proficiency]}`}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

const Languages = ({ dataHistory }) => {
  return <Skill dataHistory={dataHistory} sectionName="Languages" />;
};

const Hobbies = ({ dataHistory }) => {
  return <Skill dataHistory={dataHistory} sectionName="Hobbies" />;
};

const Tools = ({ dataHistory }) => {
  return <Skill dataHistory={dataHistory} sectionName="Tools" />;
};

const RightPane = ({ dataHistory }) => {
  return (
    <div className="CV__right-pane">
      <Details dataHistory={dataHistory} />
      <Languages dataHistory={dataHistory} />
      <Hobbies dataHistory={dataHistory} />
      <Tools dataHistory={dataHistory} />
    </div>
  );
};

export default RightPane;
