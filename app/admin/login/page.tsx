"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "rumahdigital123")
    ) {
      document.cookie = `admin_token=${password}; path=/; max-age=86400`;
      router.push("/admin");
    } else {
      setError("Password salah");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-sm border w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-serif font-bold">Admin Login</h1>
        <div>
          <label className="block text-sm font-medium text-stone-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-500"
            required
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full bg-stone-900 text-white py-2 rounded-lg text-sm hover:bg-stone-800"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
