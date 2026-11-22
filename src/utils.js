export const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(n);

// Is mahine ka total. createdAt backend se aata hai.
export function monthlyTotal(expenses, now = new Date()) {
  return expenses
    .filter((e) => {
      const d = new Date(e.createdAt);
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, e) => sum + e.amount, 0);
}

export const monthLabel = (d = new Date()) =>
  d.toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  });
