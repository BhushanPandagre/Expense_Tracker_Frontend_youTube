import { useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthPage({ mode }) {
  const isRegister = mode === "register";
  const { token, login, register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (token) return <Navigate to="/" replace />;

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister)
        await register(
          form.name,
          form.email,
          form.password,
        );
      else await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrap">
      <form className="card" onSubmit={onSubmit}>
        <h1>
          {isRegister ? "Account banao" : "Login karo"}
        </h1>

        {isRegister && (
          <input
            name="name"
            placeholder="Naam"
            value={form.name}
            onChange={onChange}
            required
          />
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password (6+ character)"
          value={form.password}
          onChange={onChange}
          minLength={6}
          required
        />

        {error && <p className="error">{error}</p>}

        <button disabled={loading}>
          {loading
            ? "Ruko..."
            : isRegister
              ? "Register"
              : "Login"}
        </button>

        <p className="muted">
          {isRegister ? (
            <>
              Account hai?{" "}
              <Link to="/login">Login karo</Link>
            </>
          ) : (
            <>
              Naye ho?{" "}
              <Link to="/register">Register karo</Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
