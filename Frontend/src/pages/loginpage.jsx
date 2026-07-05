import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    try {
      login(form.email, form.password, form.remember);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">

      <form
        onSubmit={handleSubmit}
        className="surface-card w-full max-w-md rounded-2xl p-8 shadow-xl space-y-5"
      >

        <div className="text-center">

          <h1 className="text-3xl font-bold">
            🌾 AGROLENS
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to continue
          </p>

        </div>

        <div>

          <label className="text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3"
            placeholder="you@example.com"
            required
          />

        </div>

        <div>

          <label className="text-sm font-medium">
            Password
          </label>

          <div className="relative mt-2">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-white px-4 py-3 pr-16"
              placeholder="Password"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ag-cyan"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>

        </div>

        <div className="flex items-center justify-between">

          <label className="flex items-center gap-2 text-sm">

            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
            />

            Remember me

          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-ag-cyan hover:underline"
          >
            Forgot Password?
          </Link>

        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-gradient-to-r from-ag-green to-ag-cyan py-3 font-semibold text-white transition hover:opacity-90"
        >
          Login
        </button>

        <p className="text-center text-sm">

          Don't have an account?{" "}

          <Link
            to="/signuppage"
            className="font-semibold text-ag-green hover:underline"
          >
            Sign Up
          </Link>

        </p>

      </form>

    </div>
  );
}