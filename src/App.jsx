import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import WorkCenter from "./pages/WorkCenter";
import Trending from "./pages/Trending";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<WorkCenter />} />
          {/* <Route path="/work-center" element={<WorkCenter />} /> */}
          <Route path="/trending" element={<Trending />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
