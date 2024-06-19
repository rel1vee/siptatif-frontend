"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface Pendaftaran {
  _id: string;
  kode: string;
  judul: string;
  kategori: string;
  status: string;
  createdAt: string;
}

const Pendaftaran = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pendaftaran, setPendaftaran] = useState<Pendaftaran[]>([]);

  useEffect(() => {
    // Periksa apakah pengguna sudah login
    const storedToken = localStorage.getItem("token");
    const isAuthenticated = !!storedToken;

    // Jika belum login, arahkan ke halaman login
    if (!isAuthenticated) {
      router.push("/");
    } else {
      // Ambil NIM dari localStorage
      const nim = localStorage.getItem("nim");

      if (nim) {
        // Fetch data dari API berdasarkan NIM
        axios
          .get(`https://siptatif-backend.vercel.app/api/ta/${nim}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })
          .then((response) => {
            setPendaftaran(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
  }, [router]);

  const handleDelete = (kode: string) => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setLoading(true);
      axios
        .delete(`https://siptatif-backend.vercel.app/api/ta/${kode}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(() => {
          // Remove the deleted item from the state
          setPendaftaran((prev) => prev.filter((p) => p.kode !== kode));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
          setLoading(false);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
              {/* Header */}
              <div className="grid gap-3 px-6 py-4 border-b border-gray-200 md:flex md:justify-between md:items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Riwayat Pendaftaran TA
                  </h2>
                </div>

                {/* Create Button */}
                <div>
                  <div className="inline-flex gap-x-2">
                    <Link
                      className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white rounded-lg gap-x-2 bg-gradient-to-tl from-teal-400 to-sky-500 hover:from-teal-500 hover:to-sky-600 disabled:opacity-50 disabled:pointer-events-none"
                      href="/pendaftaran/form"
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
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                      Create
                    </Link>
                  </div>
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

                    <th scope="col" className="px-6 py-3 text-end"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {pendaftaran.map((p) => (
                    <tr key={p._id}>
                      <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-3">
                          <span className="text-sm text-gray-600">
                            {new Date(p.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>

                      <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-3">
                          <span className="text-sm text-gray-600">
                            {p.judul}
                          </span>
                        </div>
                      </td>

                      <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-3">
                          <span className="text-sm text-gray-600">
                            {p.kategori}
                          </span>
                        </div>
                      </td>

                      <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-3">
                          <span
                            className={`py-1 px-1.5 inline-flex justify-center items-center gap-x-1 text-xs font-medium rounded-full ${
                              p.status === "Ditolak"
                                ? "bg-red-100 text-red-800"
                                : p.status === "Diterima"
                                ? "bg-teal-100 text-teal-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            <svg
                              className="size-2.5"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              {p.status === "Ditolak" && (
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
                              )}
                              {p.status === "Diterima" && (
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                              )}
                              {p.status === "Diproses" && (
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                              )}
                            </svg>
                            {p.status.charAt(0).toUpperCase() +
                              p.status.slice(1)}
                          </span>
                        </div>
                      </td>

                      <td className="size-px whitespace-nowrap">
                        <button
                          type="button"
                          className="block"
                          onClick={() => handleDelete(p.kode)}
                        >
                          <span className="px-6 py-1.5">
                            <span className="inline-flex items-center justify-center gap-2 px-2 py-1 text-xs font-medium align-middle transition-all border border-gray-200 bg-white text-red-500 rounded-lg shadow-sm hover:bg-red-50 disabled:opacity-50 disabled:pointer-events-none">
                            <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                              Delete
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
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-sky-600 decoration-2">
                    Total: {pendaftaran.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pendaftaran;
