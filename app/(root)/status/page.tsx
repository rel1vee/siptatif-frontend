"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Status = () => {
  const router = useRouter();
  const [viewDetail, setViewDetail] = useState(null);

  useEffect(() => {
    // Periksa apakah pengguna sudah login
    const isAuthenticated = !!localStorage.getItem("token");

    // Jika belum login, arahkan ke halaman login
    if (!isAuthenticated) {
      router.push("/sign-in");
    }
  }, [router]);

  const handleViewClick = (detail:any) => {
    setViewDetail(detail);
  };

  const closeModal = () => {
    setViewDetail(null);
  };

  const data = [
    {
      nim: "123456",
      nama: "John Doe",
      tanggal: "11 April 2024",
      judul: "Analisis dan Implementasi Rancangan Siptatif",
      kategori: "Laporan",
      pembimbing_1: "Dr. A",
      pembimbing_2: "Dr. B",
      status: "Ditolak",
    },
    {
      nim: "654321",
      nama: "Jane Smith",
      tanggal: "12 April 2024",
      judul: "Analisis dan Implementasi Rancangan Siptatif",
      kategori: "Laporan",
      pembimbing_1: "Dr. C",
      pembimbing_2: "Dr. D",
      status: "Diterima",
    },
    {
      nim: "789012",
      nama: "Alice Johnson",
      tanggal: "16 April 2024",
      judul: "Pengembangan Aplikasi Manajemen Proyek Metode Agile",
      kategori: "Laporan",
      pembimbing_1: "Dr. E",
      pembimbing_2: "Dr. F",
      status: "Diproses",
    },
  ];
  return (
    <>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
              {/* Header */}
              <div className="grid gap-3 px-6 py-4 border-b border-gray-200 md:flex md:justify-between md:items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Status Pendaftaran TA
                  </h2>
                </div>
              </div>

              {/* Table */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-sky-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase">
                          Tanggal
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase">
                          Judul Tugas Akhir
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase">
                          Kategori
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase">
                          Status
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase">
                          Detail
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td className="size-px whitespace-nowrap">
                        <span className="block px-6 py-2">
                          <span className="text-sm text-gray-600">
                            {item.tanggal}
                          </span>
                        </span>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <span className="block px-6 py-2">
                          <span className="text-sm text-gray-600">
                            {item.judul}
                          </span>
                        </span>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <span className="block px-6 py-2">
                          <span className="text-sm text-gray-600">
                            {item.kategori}
                          </span>
                        </span>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <span className="block px-6 py-2">
                          <span
                            className={`py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-full ${
                              item.status === "Ditolak"
                                ? "bg-red-100 text-red-800"
                                : item.status === "Diterima"
                                ? "bg-teal-100 text-teal-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </span>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <button
                          type="button"
                          className="block"
                          onClick={() => handleViewClick(item)}
                        >
                          <span className="px-6 py-1.5">
                            <span className="inline-flex items-center justify-center gap-2 px-2 py-1 text-xs font-medium text-white align-middle transition-all border border-transparent rounded-full bg-gradient-to-tl from-teal-400 to-sky-500 hover:from-teal-500 hover:to-sky-600 disabled:opacity-50 disabled:pointer-events-none">
                              View
                            </span>
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

               {/* Footer */}
               <div className="grid gap-3 px-6 py-4 border-t border-gray-200 md:flex md:justify-between md:items-center">
                <div>
                  <p className="text-xs font-semibold text-sky-600 decoration-2 ">
                    Total: {data.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Modal */}
       {viewDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={closeModal}>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-[90vw] max-h-[90vh] p-6 sm:p-8 overflow-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Registration Status</h2>
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-500 dark:text-gray-400">Review your registration details and status.</p>
            <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="text-gray-500 dark:text-gray-400">Student ID (NIM)</div>
              <div className="font-medium">12345678</div>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="text-gray-500 dark:text-gray-400">Name</div>
              <div className="font-medium">John Doe</div>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="text-gray-500 dark:text-gray-400">Thesis Title</div>
              <div className="font-medium">Optimizing Machine Learning Models for Predictive Analytics</div>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="text-gray-500 dark:text-gray-400">Category</div>
              <div className="font-medium">Thesis</div>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="text-gray-500 dark:text-gray-400">Primary Advisor</div>
              <div className="font-medium">Dr. Jane Smith</div>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="text-gray-500 dark:text-gray-400">Secondary Advisor</div>
              <div className="font-medium">Prof. Michael Johnson</div>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="text-gray-500 dark:text-gray-400">Status</div>
              <div className="font-medium text-green-500">Approved</div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-end">
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default Status;
