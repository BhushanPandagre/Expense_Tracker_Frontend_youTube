import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import {
  formatINR,
  monthLabel,
  monthlyTotal,
} from "../utils";

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/expenses", { token })
      .then(setExpenses)
      .catch((err) => {
        // token expire ya galat: seedha logout
        if (err.status === 401) logout();
        else setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [token, logout]);

  async function addExpense(data) {
    const created = await api("/expenses", {
      method: "POST",
      body: data,
      token,
    });
    setExpenses((prev) => [created, ...prev]);
  }

  async function deleteExpense(id) {
    try {
      await api(`/expenses/${id}`, {
        method: "DELETE",
        token,
      });
      setExpenses((prev) =>
        prev.filter((e) => e._id !== id),
      );
    } catch (err) {
      setError(err.message);
    }
  }

  // total hum store nahi karte, list se nikaalte hain
  const total = useMemo(
    () => monthlyTotal(expenses),
    [expenses],
  );

  return (
    <div className="page">
      <header className="top">
        <h1>Namaste, {user?.name}</h1>
        <button className="ghost" onClick={logout}>
          Logout
        </button>
      </header>

      <div className="card summary">
        <span className="muted">
          {monthLabel()} ka kharcha
        </span>
        <strong>{formatINR(total)}</strong>
      </div>

      <ExpenseForm onAdd={addExpense} />

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p className="muted center">Load ho raha hai...</p>
      ) : (
        <ExpenseList
          expenses={expenses}
          onDelete={deleteExpense}
        />
      )}
    </div>
  );
}
