"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/uin-suska.png";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Sidebar Toggle */}
      <section className="sticky inset-x-0 top-0 px-4 py-1.5 bg-white border-b sm:px-6 md:px-8 lg:hidden">
        <section className="flex items-center py-4">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600"
            onClick={toggleSidebar}
            aria-label="Toggle Navigation"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
          </button>
          {/* Breadcrumb */}
          <ol className="flex items-center ms-3 whitespace-nowrap">
            <li className="flex items-center text-sm text-gray-800">
              Sistem Informasi Pendaftaran TA Teknik Informatika
            </li>
          </ol>
        </section>
      </section>
      {/* Navigation Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 transform fixed top-0 start-0 z-20 bottom-0 w-64 bg-white border-e border-gray-300 pt-7 pb-10 overflow-y-auto lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-sky-50 [&::-webkit-scrollbar-thumb]:bg-gray-300`}
      >
        <section className="flex items-center px-6">
          <Image src={logo} alt="UIN Suska Riau" className="w-10 h-10" />

          <div className="flex-none ml-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-tl from-teal-400 to-sky-500">
            SIPTATIF
          </div>
        </section>
        <nav
          className="flex flex-col flex-wrap w-full p-6 hs-accordion-group"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            <li>
              <Link
                className={`flex items-center gap-x-3.5 py-2 px-2.5 text-md rounded-lg ${
                  pathname === "/beranda"
                    ? "bg-sky-50 text-slate-900"
                    : "text-slate-600 hover:bg-sky-50"
                }`}
                href="/beranda"
                onClick={closeSidebar}
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Beranda
              </Link>
            </li>
            <li>
              <Link
                className={`flex items-center gap-x-3.5 py-2 px-2.5 text-md rounded-lg ${
                  pathname === "/pendaftaran"
                    ? "bg-sky-50 text-slate-900"
                    : "text-slate-600 hover:bg-sky-50"
                }`}
                href="/pendaftaran"
                onClick={closeSidebar}
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
                Pendaftaran
              </Link>
            </li>
            <li>
              <Link
                className={`flex items-center gap-x-3.5 py-2 px-2.5 text-md rounded-lg ${
                  pathname === "/pembimbing"
                    ? "bg-sky-50 text-slate-900"
                    : "text-slate-600 hover:bg-sky-50"
                }`}
                href="/pembimbing"
                onClick={closeSidebar}
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Pembimbing
              </Link>
            </li>
            <li>
              <Link
                className={`flex items-center gap-x-3.5 py-2 px-2.5 text-md rounded-lg ${
                  pathname === "/status"
                    ? "bg-sky-50 text-slate-900"
                    : "text-slate-600 hover:bg-sky-50"
                }`}
                href="/status"
                onClick={closeSidebar}
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                Status
              </Link>
            </li>
          </ul>
        </nav>
        {/* Credit */}
        <section className="absolute bottom-0 left-0 p-6 text-xs text-gray-800">
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-l from-teal-400 to-sky-500">
            2024.
          </span>{" "}
          Mzes, Inc.
        </section>
      </aside>
    </>
  );
};

export default Sidebar;
