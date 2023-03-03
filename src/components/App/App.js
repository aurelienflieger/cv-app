import HomeScreen from "./HomeScreen/HomeScreen";
import FormManager from "./Form/FormManager/FormManager";
import React, { useState } from "react";
import "../../styles/App.css";

const App = () => {
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
};

export default App;
