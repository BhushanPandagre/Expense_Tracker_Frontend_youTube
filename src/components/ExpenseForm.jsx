import { useState } from "react";

const CATEGORIES = [
  "food",
  "travel",
  "bills",
  "shopping",
  "other",
];

export default function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onAdd({
        title,
        amount: Number(amount),
        category,
      });
      setTitle("");
      setAmount("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="card form-row" onSubmit={onSubmit}>
      <input
        placeholder="Kharcha (jaise chai)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        min="1"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button disabled={saving}>
        {saving ? "..." : "Add"}
      </button>
      {error && <p className="error full">{error}</p>}
    </form>
  );
}
