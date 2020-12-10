import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

//pages
import Suv from "./Suv";
import ChooseCar from "./ChooseCar";
import Home from "./Home";
import Menubar from "./Menubar";

const ReactRouterSetup = () => {
  return (
    <Router>
      <Route exact path="/">
        <Menubar />
        <Home />
      </Route>
      <Route exact path="/catalogue">
        <Menubar />
        <ChooseCar />
      </Route>
      <Route path="/suv">
        <Menubar />
        <Suv />
      </Route>
    </Router>
  );
};

export default ReactRouterSetup;
