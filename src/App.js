import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage";
import EventsPage from "./components/EventsPage";
import TicketsPage from "./components/TicketsPage";
import AdminLoginPage from "./components/AdminLoginPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
