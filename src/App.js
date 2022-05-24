import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./Components/HomePage";
import Grading from "./Components/Grading";
import Results from "./Components/Results";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/grading" element={<Grading />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
