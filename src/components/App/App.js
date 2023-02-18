import HomeScreen from "./HomeScreen/HomeScreen";
import FormManager from "./Form/FormManager/FormManager";
import React, { useState } from "react";
import CV from "./CV/CV";
import "../../styles/App.css";

/* const App = () => {
  const [isFirstLanding, toggleHomeScreen] = useState(true);
  return (
    <div className="App">
      {isFirstLanding ? (
        <HomeScreen toggleHomeScreen={toggleHomeScreen} />
      ) : (
        <FormManager />
      )}
    </div>
  );
}; */

const App = () => {
  return <div className="App">
  <CV/>
  </div>;
};

export default App;
