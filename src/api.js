const BASE = import.meta.env.VITE_API_URL;

export async function api(
  path,
  { method = "GET", body, token } = {},
) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // 429 ka jawab JSON nahi hota, isliye catch lagaya hai
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      res.status === 429
        ? "Bahut zyada requests, thoda ruko"
        : data.message || "Kuch gadbad ho gayi";
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  return data;
}
