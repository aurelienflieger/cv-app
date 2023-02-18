import React from "react";

const Details = () => {
  return (
    <div className="CV__details">
      <h3 className="CV__section-title">Details</h3>
      <div className="CV__details-group">
        <p className="CV__entry-text">05/08/1998</p>
        <p className="CV__entry-text">St. James Street 3</p>
        <p className="CV__entry-text">78950 London</p>
        <p className="CV__entry-text">+385 452 145</p>
        <p className="CV__entry-text">larcher@me.com</p>
      </div>
    </div>
  );
};

const Languages = () => {
  return (
    <div className="CV__languages">
      <h3 className="CV__section-title">Languages</h3>
      <div className="CV__skills-group">
        <div className="CV__name-and-skill">
          <p className="CV__entry-text">Dutch</p>
          <span className="progress-bar level-5" />
        </div>
        <div className="CV__name-and-skill">
          <p className="CV__entry-text">German</p>
          <span className="progress-bar level-4" />
        </div>
        <div className="CV__name-and-skill">
          <p className="CV__entry-text">English</p>
          <span className="progress-bar level-3" />
        </div>
      </div>
    </div>
  );
};

const Hobbies = () => {
  return (
    <div className="CV__hobbies">
      <h3 className="CV__section-title">Hobbies</h3>
      <div className="CV__skills-group">
        <div className="CV__name-and-skill">
          <p className="CV__entry-text">UI Design Interfacing</p>
          <span className="progress-bar level-5" />
        </div>
        <div className="CV__name-and-skill">
          <p className="CV__entry-text">Gardening</p>
          <span className="progress-bar level-2" />
        </div>
        <div className="CV__name-and-skill">
          <p className="CV__entry-text">Going to the movies</p>
          <span className="progress-bar level-1" />
        </div>
      </div>
    </div>
  );
};

const Tools = () => {
  return (
    <div className="CV__tools">
      <h3 className="CV__section-title">Tools</h3>
      <div className="CV__skills-group">
        <div className="CV__name-and-skill">
          <p className="CV__entry-text">Microsoft Office</p>
          <span className="progress-bar level-5" />
        </div>
        <div className="CV__name-and-skill">
          <p className="CV__entry-text">Google Docs</p>
          <span className="progress-bar level-4" />
        </div>
        <div className="CV__name-and-skill">
          <p className="CV__entry-text">React</p>
          <span className="progress-bar level-3" />
        </div>
      </div>
    </div>
  );
};

const RightPane = () => {
  return (
    <div className="CV__right-pane">
      <Details />
      <Languages />
      <Hobbies />
      <Tools />
    </div>
  );
};

export default RightPane;
