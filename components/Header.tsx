"use client";

import Image from "next/image";
import React, { useState } from "react";
import avatar from "@/public/avatar.png";
import logo from "@/public/uin-suska.png";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
    setShowNotificationDropdown(false);
  };

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    setShowUserDropdown(false);
  };

  const handleSignOutClick = () => {
    setShowSignOutModal(true);
    setShowUserDropdown(false);
  };

  const handleConfirmSignOut = () => {
    localStorage.clear(); // Clear all data in local storage
    router.push("/");
    setShowSignOutModal(false);
  };

  const handleCancelSignOut = () => {
    setShowSignOutModal(false);
  };

  return (
    <>
      {/* Header */}
      <header className="top-0 inset-x-0 z-10 flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white border-b border-gray-300 text-sm py-2.5 sm:py-4 lg:ps-64">
        <nav className="flex w-full px-4 mx-auto basis-full sm:px-6 md:px-8">
          <section className="flex items-center me-5 lg:me-0 lg:hidden">
            <Image src={logo} alt="UIN Suska Riau" className="w-10 h-10" />
            <div className="flex-none ml-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-tl from-teal-400 to-sky-500">
              SIPTATIF
            </div>
          </section>
          <section className="flex items-center justify-end w-full sm:w-auto ms-auto sm:justify-between sm:gap-x-3 sm:order-3">
            <section className="relative inline-flex">
              <button
                type="button"
                className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-sky-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={toggleNotificationDropdown}
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
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
              </button>

              {showNotificationDropdown && (
                <div className="absolute right-0 z-10 w-48 mt-10 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-gray-900"
                      role="menuitem"
                    >
                      Nothing up-to-date
                    </div>
                  </div>
                </div>
              )}
            </section>
            <section className="relative inline-flex">
              <button
                type="button"
                className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-sky-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={toggleUserDropdown}
              >
                <Image
                  className="inline-block size-[38px] rounded-full ring-2 ring-white"
                  src={avatar}
                  alt="Image's Profile"
                />
              </button>
              {showUserDropdown && (
                <div className="absolute right-0 z-10 w-48 mt-10 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-gray-900"
                      role="menuitem"
                      onClick={handleSignOutClick}
                    >
                      <svg
                        className="w-5 h-5 mr-3 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign out
                    </div>
                  </div>
                </div>
              )}
            </section>
          </section>
        </nav>
      </header>
      {/* Modal */}
      {showSignOutModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="relative z-50 max-w-xl px-12 py-10 bg-white rounded-lg shadow-lg">
              <div className="mb-6 text-center">
                <span className="mb-4 inline-flex justify-center items-center size-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500 ">
                  <svg
                    className="flex-shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </span>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Sign Out
                </h3>
                <p className="mt-2 text-gray-600">
                  Are you sure you want to sign out of this account?
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  className="px-6 py-3 mr-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 "
                  onClick={handleCancelSignOut}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-3 text-sm font-medium text-white rounded-md bg-gradient-to-l from-teal-400 to-sky-500 hover:from-teal-500 hover:to-sky-600 "
                  onClick={handleConfirmSignOut}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
