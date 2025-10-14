// src/BudgetCalculator.jsx
import React, { useState } from "react";

export default function BudgetCalculator() {
  const [income, setIncome] = useState("");
  const [rent, setRent] = useState("");
  const [food, setFood] = useState("");
  const [transport, setTransport] = useState("");
  const [others, setOthers] = useState("");
  const [balance, setBalance] = useState(null);
  const [message, setMessage] = useState("");
  const [statusClass, setStatusClass] = useState("");

  const validateAndParse = (val) => {
    if (val === "" || val === null) return null;
    const num = parseFloat(val);
    if (Number.isNaN(num)) return null;
    return num;
  };

  const calculateBalance = () => {
    // Basic presence check
    if (
      income === "" ||
      rent === "" ||
      food === "" ||
      transport === "" ||
      others === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    // Parse values
    const i = validateAndParse(income);
    const r = validateAndParse(rent);
    const f = validateAndParse(food);
    const t = validateAndParse(transport);
    const o = validateAndParse(others);

    if (i === null || r === null || f === null || t === null || o === null) {
      alert("Please enter valid numbers.");
      return;
    }

    // Positive checks (income must be positive, expenses must be >= 0)
    if (i <= 0) {
      alert("Monthly Income must be positive.");
      return;
    }
    if (r < 0 || f < 0 || t < 0 || o < 0) {
      alert("Expenses cannot be negative.");
      return;
    }

    const totalExpenses = r + f + t + o;
    const remaining = i - totalExpenses;
    setBalance(remaining);

    if (remaining < 0) {
      setMessage("You are overspending!");
      setStatusClass("text-danger");
    } else {
      setMessage("Good job managing your expenses!");
      setStatusClass("text-success");
    }
  };

  const resetForm = () => {
    setIncome("");
    setRent("");
    setFood("");
    setTransport("");
    setOthers("");
    setBalance(null);
    setMessage("");
    setStatusClass("");
  };

  return (
    <div className="container col-md-6">
      <div className="card shadow p-4 my-4">
        <h2 className="text-center mb-3">💰 Budget Calculator</h2>

        <div className="mb-3">
          <label className="form-label">Monthly Income</label>
          <input
            type="number"
            className="form-control"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter your monthly income"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Rent / EMI</label>
          <input
            type="number"
            className="form-control"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            placeholder="Enter rent or EMI"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Food Expenses</label>
          <input
            type="number"
            className="form-control"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            placeholder="Enter food expenses"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Transport Expenses</label>
          <input
            type="number"
            className="form-control"
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
            placeholder="Enter transport expenses"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Other Expenses</label>
          <input
            type="number"
            className="form-control"
            value={others}
            onChange={(e) => setOthers(e.target.value)}
            placeholder="Enter other expenses"
          />
        </div>

        <div className="d-grid gap-2">
          <button className="btn btn-primary" onClick={calculateBalance}>
            Calculate Balance
          </button>
          <button className="btn btn-outline-secondary" onClick={resetForm}>
            Reset
          </button>
        </div>

        {balance !== null && (
          <div className="mt-4 text-center">
            <h4>
              Remaining Balance:{" "}
              <span className={statusClass}>₹{balance.toFixed(2)}</span>
            </h4>
            <p className={statusClass}>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
