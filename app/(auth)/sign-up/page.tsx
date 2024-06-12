"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const SignUp = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

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
        toast.success("Akun berhasil dibuat!", {
          style: {
            backgroundColor: "white",
            color: "green",
          },
        });

        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      setError("An error occurred on the server.");
    }
  };

  return (
    <>
      <section className="w-full px-4 py-12 mx-auto md:max-w-md md:px-12">
        <h3 className="text-2xl font-semibold text-center text-gray-700">
          Sign Up
        </h3>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 border rounded-lg"
            required
          />

          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@students.uin-suska.ac.id"
            className="w-full px-4 py-2 text-gray-700 border rounded-lg"
            required
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 border rounded-lg"
            required
          />

          <button
            type="submit"
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm bg-gradient-to-l from-teal-400 to-sky-500 hover:from-teal-500 hover:to-sky-600 "
          >
            Sign Up
          </button>
        </form>
        <section className="mt-6 text-center">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            Already have an account? Sign in!
          </Link>
        </section>
      </section>
      <Toaster />
    </>
  );
};

export default SignUp;
