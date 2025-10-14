// src/App.js
import React from "react";
import BudgetCalculator from "./BudgetCalculator";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="app-bg min-vh-100 d-flex align-items-center">
      <BudgetCalculator />
    </div>
  );
}

export default App;
