"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { loginUser } from '@/services/auth/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    // TODO: Replace with your API call
    try {
      const resData = await loginUser(form.email, form.password);

      if (resData && resData.token && resData.user) {
        // Store token and user info in cookies (expires in 3 days)
        document.cookie = `token=${resData.token}; path=/;`;
        document.cookie = `userInfo=${encodeURIComponent(JSON.stringify(resData.user))}; `;
      }

      if(resData){
        toast.success(resData.message);
        router.push('/dashboard');
        return;
      }
      setTimeout(() => {
        setSuccess('Login successful!');
        setLoading(false);
      }, 1200);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Something went wrong');
      } else {
        setError('Something went wrong');
      }
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Login to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
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
            <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className="text-red-500 text-center text-sm">{error}</div>}
          {success && <div className="text-green-600 text-center text-sm">{success}</div>}
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account? <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

