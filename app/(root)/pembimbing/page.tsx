"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Dosen {
  _id: string;
  nip: string;
  nama: string;
  keahlian: string;
  kuota: number;
}

const Pembimbing = () => {
  const router = useRouter();
  const [dosen, setDosen] = useState<Dosen[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Periksa apakah pengguna sudah login
    const isAuthenticated = !!localStorage.getItem("token");

    // Jika belum login, arahkan ke halaman login
    if (!isAuthenticated) {
      router.push("/");
    } else {
      // Fetch data dari API
      axios
        .get("https://siptatif-backend.vercel.app/api/dosen")
        .then((response) => {
          setDosen(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Filter data dosen berdasarkan searchTerm
  const filteredDosen = dosen.filter(
    (d) =>
      d.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.keahlian.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
              {/*  Header */}
              <div className="grid gap-3 px-6 py-4 border-b border-gray-200 md:flex md:justify-between md:items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Daftar Pembimbing TA
                  </h2>
                </div>

                {/*  Search */}
                <div className="sm:col-span-1">
                  <label className="sr-only">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-lg ps-11 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-4">
                      <svg
                        className="flex-shrink-0 text-gray-400 size-4"
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
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/*  Table */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-sky-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase">
                          NIP
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase">
                          Nama Dosen
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase">
                          Keahlian
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase">
                          Kuota
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {filteredDosen.map((d) => (
                    <tr key={d._id}>
                      <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-3">
                          <span className="text-sm text-gray-600">{d.nip}</span>
                        </div>
                      </td>

                      <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-3">
                          <span className="text-sm text-gray-800">
                            {d.nama}
                          </span>
                        </div>
                      </td>

                      <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-3">
                          <span className=" text-sm  text-gray-800">
                            {d.keahlian}
                          </span>
                        </div>
                      </td>

                      <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-3">
                          <div className="flex items-center gap-x-3">
                            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">
                              <svg
                                className="size-2.5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                              </svg>
                              {d.kuota} Mahasiswa
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/*  Footer */}
              <div className="grid gap-3 px-6 py-4 border-t border-gray-200md:flex md:justify-between md:items-center">
                <div>
                  <p className="text-xs font-semibold text-sky-600 decoration-2">
                    Total: {filteredDosen.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pembimbing;
