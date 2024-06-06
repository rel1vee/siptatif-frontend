"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

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
        const accessToken = data.data.accessToken; // Asumsikan server mengembalikan token di dalam objek respons

        // Ekstrak nama pengguna dari payload token JWT
        const payloadBase64 = accessToken.split(".")[1];
        const payloadBuffer = Buffer.from(payloadBase64, "base64");
        const payload = JSON.parse(payloadBuffer.toString());
        const userName = payload._doc.nama;
        const email = payload._doc.email;
        const nim = email.split("@")[0];
        
        // Simpan token, payload token, nama pengguna, dan NIM ke localStorage
        localStorage.setItem("token", accessToken);
        localStorage.setItem("userPayload", JSON.stringify(payload));
        localStorage.setItem("userName", userName);
        localStorage.setItem("nim", nim);

        // Tampilkan toast sukses
        toast.success("Login berhasil!", {
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
        toast.error("Invalid email or password", {
          style: {
            backgroundColor: "white",
            color: "red",
          },
        });
      }
    } catch (error) {
      setError("An error occured on server.");
    }
  };

  return (
    <>
      <section className="w-full md:max-w-md px-4 mx-auto py-12 md:px-12">
        <h3 className="text-2xl font-semibold text-gray-700 text-center">
          Sign In
        </h3>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-l from-teal-400 to-sky-500 hover:from-teal-500 hover:to-sky-600"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <Link
            href="/sign-up"
            className="text-sm text-blue-600 hover:underline"
          >
            Don&apos;t have an account? Sign up!
          </Link>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default SignIn;
