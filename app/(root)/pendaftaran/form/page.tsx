"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

interface Dosen {
  _id: string;
  nip: string;
  nama: string;
}

const FormPendaftaran = () => {
  const router = useRouter();
  const [nim, setNim] = useState("");
  const [file, setFile] = useState("");
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [pembimbing1, setPembimbing1] = useState("");
  const [pembimbing2, setPembimbing2] = useState("");
  const [dosenList, setDosenList] = useState<Dosen[]>([]);
  const [showDaftarModal, setShowDaftarModal] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const isAuthenticated = !!storedToken;
    const storedNim = localStorage.getItem("nim");
    const storedNama = localStorage.getItem("nama");
    if (storedNim) setNim(storedNim);
    if (storedNama) setNama(storedNama);

    if (!isAuthenticated) {
      router.push("/");
    } else {
      axios
        .get("https://siptatif-backend.vercel.app/api/dosen", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setDosenList(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [router]);

  const handleDaftarClick = (e: React.FormEvent) => {
    e.preventDefault();

    setShowDaftarModal(true);
  };

  const handleConfirmDaftar = async () => {
    const storedToken = localStorage.getItem("token");
    const formData = {
      nim: nim,
      nama: nama,
      judul: judul,
      kategori: kategori,
      pembimbing_1: pembimbing1,
      pembimbing_2: pembimbing2,
      file: file,
    };

    try {
      await axios.post("https://siptatif-backend.vercel.app/api/ta", formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Pendaftaran berhasil !", {
        style: {
          backgroundColor: "white",
          color: "green",
        },
      });
      
      setTimeout(() => {
        router.push("/pendaftaran");
      }, 2000);
    } catch (error) {
      toast.error("Pendaftaran gagal !", {
        style: {
          backgroundColor: "white",
          color: "red",
        },
      });
    }

    setShowDaftarModal(false);
  };

  const handleCancelDaftar = () => {
    setShowDaftarModal(false);
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleDaftarClick}>
        {/* Card */}
        <div className="p-4 mb-8 bg-white border shadow rounded-xl sm:p-7">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Formulir Pendaftaran TA
            </h2>
          </div>

          {/* Grid */}
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <label htmlFor="nim" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                NIM
              </label>

              <input
                id="nim"
                name="nim"
                type="text"
                value={nim}
                className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-lg shadow-sm pe-11 disabled:opacity-50 disabled:pointer-events-none"
                autoComplete="nim"
                onChange={(e) => setNim(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="nama" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                Nama Mahasiswa
              </label>

              <input
                id="nama"
                name="nama"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-lg shadow-sm pe-11 disabled:opacity-50 disabled:pointer-events-none"
                autoComplete="nama"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="judul" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                Judul Tugas Akhir
              </label>

              <input
                id="judul"
                name="judul"
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-lg shadow-sm pe-11 disabled:opacity-50 disabled:pointer-events-none"
                autoComplete="judul"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="kategori" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                Kategori
              </label>

              <select
                id="kategori"
                name="kategori"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-lg shadow-sm pe-9 disabled:opacity-50 disabled:pointer-events-none"
              >
                <option>-- Pilih Kategori --</option>
                <option>Laporan</option>
                <option>Paper Based</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="pembimbing-1" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                Pembimbing 1
              </label>

              <select
                id="pembimbing-1"
                name="pembimbing-1"
                value={pembimbing1}
                onChange={(e) => setPembimbing1(e.target.value)}
                className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-lg shadow-sm pe-9 disabled:opacity-50 disabled:pointer-events-none"
              >
                <option>-- Pilih Pembimbing 1 --</option>
                {dosenList.map((dosen) => (
                  <option key={dosen._id} value={dosen.nama}>
                    {dosen.nama}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="pembimbing-2" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                Pembimbing 2
              </label>

              <select
                id="pembimbing-2"
                name="pembimbing-2"
                value={pembimbing2}
                onChange={(e) => setPembimbing2(e.target.value)}
                className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-lg shadow-sm pe-9 disabled:opacity-50 disabled:pointer-events-none"
              >
                <option>-- Pilih Pembimbing 2 --</option>
                {dosenList.map((dosen) => (
                  <option key={dosen._id} value={dosen.nama}>
                    {dosen.nama}
                  </option>
                ))}
                <option>-</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="berkas" className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                Link File (Google Drive, OneDrive, atau Dropbox)
              </label>

              <input
                id="berkas"
                name="berkas"
                type="text"
                value={file}
                onChange={(e) => setFile(e.target.value)}
                className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-lg shadow-sm pe-11 disabled:opacity-50 disabled:pointer-events-none"
                autoComplete="berkas"
                required
              />
              <p className="mt-1 text-sm text-gray-300">
                Pastikan link file dapat diakses secara publik.
              </p>
            </div>
          </div>

          {/* Send & Cancel Button */}
          <div className="flex items-center justify-center mt-8 gap-x-2">
            <Link href="/pendaftaran">
              <button
                type="button"
                className="inline-flex px-4 py-3 text-sm font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              >
                Kembali
              </button>
            </Link>
            <button
              type="submit"
              className="inline-flex px-4 py-3 ml-2 text-sm font-semibold text-white rounded-lg gap-x-2 bg-gradient-to-tl from-teal-400 to-sky-500 hover:from-teal-500 hover:to-sky-600 disabled:opacity-50 disabled:pointer-events-none"
            >
              Daftar
            </button>
          </div>
        </div>

        {showDaftarModal && (
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
                    Data Confirmation
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Are you sure you want to submit this data?
                  </p>
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="px-6 py-3 mr-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 "
                    onClick={handleCancelDaftar}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-6 py-3 text-sm font-medium text-white rounded-md bg-gradient-to-l from-teal-400 to-sky-500 hover:from-teal-500 hover:to-sky-600 "
                    onClick={handleConfirmDaftar}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default FormPendaftaran;
