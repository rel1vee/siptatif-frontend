"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface Pendaftaran {
  _id: string;
  kode: string;
  nim: string;
  nama: string;
  judul: string;
  kategori: string;
  pembimbing_1: string;
  pembimbing_2: string;
  penguji_1: string;
  penguji_2: string;
  status: string;
  keterangan: string;
  createdAt: string;
}

const Status = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pendaftaran, setPendaftaran] = useState<Pendaftaran[]>([]);
  const [viewDetail, setViewDetail] = useState<Pendaftaran | null>(null);

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

  const handleViewClick = (detail: any) => {
    setViewDetail(detail);
  };

  const closeModal = () => {
    setViewDetail(null);
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
                  {pendaftaran.map((item) => (
                    <tr key={item._id}>
                      <td className="size-px whitespace-nowrap">
                        <span className="block px-6 py-2">
                          <span className="text-sm text-gray-600">
                            {new Date(item.createdAt).toLocaleDateString()}
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
                            <svg
                              className="size-2.5"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              {item.status === "Ditolak" && (
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
                              )}
                              {item.status === "Diterima" && (
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                              )}
                              {item.status === "Diproses" && (
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                              )}
                            </svg>
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
                  <p className="text-xs font-semibold text-sky-600 decoration-2">
                    Total: {pendaftaran.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {viewDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-[90vw] max-h-[90vh] p-6 sm:p-8 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Detail Pendaftaran TA</h2>
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-gray-500">Review your registration data.</p>
              <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-gray-200 pt-4">
                <div className="text-gray-500">NIM</div>
                <div className="font-medium">{viewDetail.nim}</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-gray-200 pt-4">
                <div className="text-gray-500">Nama</div>
                <div className="font-medium">{viewDetail.nama}</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-gray-200 pt-4">
                <div className="text-gray-500">Judul Tugas Akhir</div>
                <div className="font-medium">{viewDetail.judul}</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-gray-200 pt-4">
                <div className="text-gray-500">Kategori</div>
                <div className="font-medium">{viewDetail.kategori}</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-gray-200 pt-4">
                <div className="text-gray-500">Pembimbing 1</div>
                <div className="font-medium">{viewDetail.pembimbing_1}</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-gray-200 pt-4">
                <div className="text-gray-500">Pembimbing 2</div>
                <div className="font-medium">{viewDetail.pembimbing_2}</div>
              </div>
              {viewDetail.status === "Diterima" && (
                <>
                  <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-green-500 pt-4">
                    <div className="text-gray-500">Penguji 1</div>
                    <div className="font-medium">{viewDetail.penguji_1}</div>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-green-500 pt-4">
                    <div className="text-gray-500">Penguji 2</div>
                    <div className="font-medium">{viewDetail.penguji_2}</div>
                  </div>
                </>
              )}
              {viewDetail.status === "Ditolak" && (
                <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-red-500 pt-4">
                  <div className="text-gray-500">Catatan</div>
                  <div className="font-medium">{viewDetail.keterangan}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Status;
