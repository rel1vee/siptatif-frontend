"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://siptatif-backend.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.data.accessToken;

        // Ekstrak nama pengguna dari payload token JWT
        const payloadBase64 = accessToken.split(".")[1];
        const payloadBuffer = Buffer.from(payloadBase64, "base64");
        const payload = JSON.parse(payloadBuffer.toString());
        const nama = payload._doc.nama;
        const email = payload._doc.email;
        const nim = email.split("@")[0];

        // Simpan token, nama dan nim ke localStorage
        localStorage.setItem("token", accessToken);
        localStorage.setItem("nama", nama);
        localStorage.setItem("nim", nim);

        // Tampilkan toast sukses
        toast.success("Login berhasil !", {
          style: {
            backgroundColor: "white",
            color: "green",
          },
        });

        setTimeout(() => {
          router.push("/beranda");
        }, 2000);
      } else {
        // Tampilkan toast error
        toast.error("Invalid email or password !", {
          style: {
            backgroundColor: "white",
            color: "red",
          },
        });
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
          Sign In
        </h3>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@students.uin-suska.ac.id"
            className="w-full px-4 py-2 text-gray-700 border rounded-lg"
            autoComplete="email"
            required
          />

          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 border rounded-lg"
            autoComplete="current-password"
            required
          />

          <button
            type="submit"
            className="w-full py-2 text-sm font-medium text-white rounded-lg shadow-sm bg-gradient-to-l from-teal-400 to-sky-500 hover:from-teal-500 hover:to-sky-600"
          >
            Sign In
          </button>
        </form>
        <section className="mt-6 text-center">
          <Link
            href="/sign-up"
            className="text-sm text-blue-600 hover:underline"
          >
            Don&apos;t have an account? Sign up!
          </Link>
        </section>
      </section>
    </>
  );
};

export default SignIn;
