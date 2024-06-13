"use client";

import Image from "next/image";
import logo from "@/public/uin-suska.png";
import { Typewriter } from "react-simple-typewriter";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex items-center justify-center min-h-screen animate-gradient">
      <section className="w-full max-w-4xl mx-6 overflow-hidden bg-white rounded-lg shadow-md md:flex">
        <section className="hidden p-8 md:block md:w-1/2 bg-sky-50">
          <section className="flex flex-col justify-between h-full">
            <section className="flex items-center">
              <Image src={logo} alt="UIN Suska Riau" className="w-9 h-9" />
              <p className="ml-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-tl from-teal-400 to-sky-500">
                SIPTATIF
              </p>
            </section>
            <section>
              <h2 className="text-4xl font-bold leading-tight text-gray-900">
                <Typewriter
                  words={[
                    "Selamat Datang, Pejuang Tugas Akhir !",
                    "Semangat Ya !",
                    "Good Luck !",
                  ]}
                  loop={1}
                  typeSpeed={50}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sistem Informasi Pendaftaran Tugas Akhir <br /> Teknik
                Informatika - UIN Sultan Syarif Kasim Riau
              </p>
            </section>
            <p className="text-xs text-gray-500">
              © 2024. Mzes, Inc. All rights reserved.
            </p>
          </section>
        </section>
        {children}
      </section>
    </main>
  );
}
