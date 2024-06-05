"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

const SignUp = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validasi email
    const emailRegex = /^[\w-\.]+@students\.uin-suska\.ac\.id$/;
    if (!emailRegex.test(email)) {
      setError("Only accept email with @students.uin-suska.ac.id");
      return;
    }

    try {
      const response = await fetch(
        "https://siptatif-backend.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nama, email, password }),
        }
      );

      if (response.ok) {
        // Tampilkan toast akun berhasil dibuat
        toast.success("Akun berhasil dibuat!", {
          style: {
            backgroundColor: "white",
            color: "green",
          },
        });

        // Redirect ke halaman login setelah 2 detik (2000 milidetik)
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      } else {
        await response.json();
      }
    } catch (error) {
      setError("An error occured on server.");
    }
  };

  return (
    <>
      <section className="w-full md:max-w-md px-4 py-12 md:px-12 mx-auto">
        <h3 className="text-2xl font-semibold text-gray-700 text-center">
          Sign Up
        </h3>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@students.uin-suska.ac.id"
              className="w-full px-4 py-2 border rounded-lg text-gray-700"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-l from-teal-400 to-sky-500 hover:from-teal-500 hover:to-sky-600 "
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <Link
            href="/sign-in"
            className="text-sm text-blue-600 hover:underline"
          >
            Already have an account? Sign in!
          </Link>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default SignUp;
