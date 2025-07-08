"use client";
import React, { useState } from "react";
import Link from "next/link";
import { registerUser } from "../../../services/auth/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Await the registerUser function to get the response data
      const resData = await registerUser(form.name, form.email, form.password);

      if (resData) {
        toast.success(resData.message);
        setSuccess(resData.message);
        setError("");
        router.push("/login");
      } else {
        // If API returns an error message
        setError(resData?.message);
        toast.error(resData?.message);
        setSuccess("");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
        toast.error(err.message || "Something went wrong");
      } else {
        setError("Something went wrong");
        toast.error("Something went wrong");
      }
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Create your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 pr-12"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575m1.664-2.13A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.657-.403 3.22-1.125 4.575m-1.664 2.13A9.956 9.956 0 0112 21c-2.21 0-4.267-.72-5.925-1.95M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9.197 4.803A9.956 9.956 0 0112 21c2.21 0 4.267-.72 5.925-1.95M21 21l-6-6m-6 6l6-6"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Registering" : "Register"}
          </button>
          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-center text-sm">{success}</div>
          )}
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
