import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "@/lib/auth";

export default function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate() {
    if (!form.firstName.trim()) return "First name is required";
    if (!form.lastName.trim()) return "Last name is required";

    if (!form.email.includes("@"))
      return "Please enter a valid email address.";

    if (form.password.length < 6)
      return "Password must be at least 6 characters.";

    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      signup(form);
      navigate("/loginpage");
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
            Create your account
          </p>

        </div>

        <div>

          <label className="text-sm font-medium">
            First Name
          </label>

          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3"
            placeholder="First name"
          />

        </div>

        <div>

          <label className="text-sm font-medium">
            Last Name
          </label>

          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-3"
            placeholder="Last name"
          />

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
              placeholder="Create password"
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

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-gradient-to-r from-ag-green to-ag-cyan py-3 font-semibold text-white transition hover:opacity-90"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/loginpage"
            className="font-semibold text-ag-cyan hover:underline"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}