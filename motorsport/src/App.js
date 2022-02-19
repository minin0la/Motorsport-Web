import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuAppBar from "./pages/MenuAppBar";
import VehiclesList from "./pages/VehiclesList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage />
            </>
          }
        />
        <Route
          path="/vehicles"
          element={
            <>
              <VehiclesList />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
