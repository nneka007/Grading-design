import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

import HomePage from "./Components/HomePage";
import Grading from "./Components/Grading";
import Results from "./Components/Results";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/grading" element={<Grading />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
