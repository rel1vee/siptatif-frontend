"use client";

import Image from "next/image";
import logo from "@/public/uin-suska.png";
import { Typewriter } from "react-simple-typewriter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex justify-center items-center animate-gradient">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden md:flex">
        <section className="hidden md:block md:w-1/2 bg-sky-50 p-8">
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center">
              <Image src={logo} alt="UIN Suska Riau" className="w-9 h-9" />
              <p className="ml-2 text-transparent bg-clip-text bg-gradient-to-tl from-teal-400 to-sky-500 font-bold text-xl">
                SIPTATIF
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
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
            </div>
            <p className="text-xs text-gray-500">
              © 2024. Mzes, Inc. All rights reserved.
            </p>
          </div>
        </section>
        {children}
      </div>
    </main>
  );
}
