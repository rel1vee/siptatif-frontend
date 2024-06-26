"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[\w-\.]+@students\.uin-suska\.ac\.id$/;

    if (!emailRegex.test(email)) {
      toast.error("Required @students.uin-suska.ac.id !", {
        style: {
          backgroundColor: "white",
          color: "red",
        },
      });
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
        toast.success("Akun berhasil dibuat !", {
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
      toast.error("Error on the server !", {
        style: {
          backgroundColor: "white",
          color: "red",
        },
      });
    }
  };

  return (
    <>
      <Toaster />
      <section className="w-full px-6 py-12 md:max-w-md md:px-12">
        <h3 className="text-2xl font-semibold text-center text-gray-700">
          Sign Up
        </h3>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <label htmlFor="nama" className="block text-gray-700">
            Nama
          </label>
          <input
            id="nama"
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

          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 border rounded-lg"
            autoComplete="new-password"
            required
          />

          <button
            type="submit"
            className="w-full py-2 text-sm font-medium text-white rounded-lg shadow-sm bg-gradient-to-l from-teal-400 to-sky-500 hover:from-teal-500 hover:to-sky-600"
          >
            Sign Up
          </button>
        </form>
        <section className="mt-6 text-center">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            Have an account already? Sign in!
          </Link>
        </section>
      </section>
    </>
  );
};

export default SignUp;
