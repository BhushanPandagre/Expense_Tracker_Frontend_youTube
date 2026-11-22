import { formatINR } from "../utils";

export default function ExpenseList({
  expenses,
  onDelete,
}) {
  if (expenses.length === 0) {
    return (
      <p className="muted center">
        Abhi koi kharcha nahi. Upar se add karo.
      </p>
    );
  }

  return (
    <ul className="list">
      {expenses.map((e) => (
        <li key={e._id} className="card item">
          <div>
            <strong>{e.title}</strong>
            <span className="tag">{e.category}</span>
            <div className="muted small">
              {new Date(e.createdAt).toLocaleDateString(
                "en-IN",
              )}
            </div>
          </div>
          <div className="right">
            <span className="amount">
              {formatINR(e.amount)}
            </span>
            <button
              className="danger"
              onClick={() => onDelete(e._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
