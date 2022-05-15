import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



import HomePage from './Components/HomePage';
import Grading from './Components/Grading';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route
        path="/"
        element={<HomePage />}
      />
          <Route
        path="/grading"
        element={<Grading />}
      />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
