import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import URLNavbar from "./components/Navbar";
import Original from "./pages/Original";
import URLList from "./pages/URLList";
import { URLProvider } from "./contexts/URLContexts";
import TestTable from "./pages/TestTable";

const App: React.FC = () => {
  return (
    <URLProvider>
      <Router>
        <URLNavbar />
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<URLList />} />
            <Route path="/table" element={<TestTable />} />
            <Route path="/:slug" element={<Original />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </URLProvider>
  );
};

export default App;
