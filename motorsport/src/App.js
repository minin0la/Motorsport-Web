import React from "react";
import "./App.css";
import Head from "./pages/Head";
import Menubar from "./pages/Menubar";
import Suv from "./pages/Suv";

function App() {
  return (
    <>
      <Head />
      <Menubar />
      <div>
        <Suv />
      </div>
    </>
  );
}

export default App;
