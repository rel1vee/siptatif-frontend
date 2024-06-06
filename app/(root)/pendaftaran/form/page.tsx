"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Set the workerSrc for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Definisikan tipe data untuk Dosen
interface Dosen {
  _id: string;
  nip: string;
  nama: string;
}

export default function FormPendaftaran() {
  const [showDaftarModal, setShowDaftarModal] = useState(false);
  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [pembimbing1, setPembimbing1] = useState("");
  const [pembimbing2, setPembimbing2] = useState("");
  const [dosenList, setDosenList] = useState<Dosen[]>([]);
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const selectedFile = e.target.files ? e.target.files[0] : null;
      setFile(selectedFile);
      if (selectedFile) {
        const fileURL = URL.createObjectURL(selectedFile);
        setFilePreview(fileURL);
        setError(null);
      } else {
        setFilePreview(null);
      }
    } catch (err) {
      setError("Failed to load file");
      console.error(err);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
    setError(null);
  };

  useEffect(() => {
    // Periksa apakah pengguna sudah login
    const isAuthenticated = !!localStorage.getItem("token");

    // Jika belum login, arahkan ke halaman login
    if (!isAuthenticated) {
      router.push("/");
    } else {
      // Get NIM and Nama from localStorage
      const storedNim = localStorage.getItem("nim");
      const storedNama = localStorage.getItem("userName");
      if (storedNim) setNim(storedNim);
      if (storedNama) setNama(storedNama);

      // Fetch the list of advisors
      axios
        .get("https://siptatif-backend.vercel.app/api/dosen")
        .then((response) => {
          setDosenList(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching dosen data:", error);
        });
    }
  }, [router]);

  const handleDaftarClick = () => {
    setShowDaftarModal(true);
  };

  const handleConfirmDaftar = () => {
    const formData = new FormData();
    formData.append("nim", nim);
    formData.append("nama", nama);
    formData.append("judul", judul);
    formData.append("kategori", kategori);
    formData.append("pembimbing_1", pembimbing1);
    formData.append("pembimbing_2", pembimbing2);
    if (file) {
      formData.append("file", file);
    }

    axios
      .post("http://siptatif-backend.vercel.app/api/ta", formData)
      .then((response) => {
        console.log("Pendaftaran berhasil:", response.data);
        // Tampilkan toast sukses
        toast.success("Pendaftaran berhasil!", {
          style: {
            backgroundColor: "white",
            color: "green",
          },
        });
        setTimeout(() => {
          router.push("/pendaftaran");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error submitting pendaftaran:", error);
        // Tampilkan toast error
        toast.error("Pendaftaran gagal!", {
          style: {
            backgroundColor: "white",
            color: "red",
          },
        });
      });

    setShowDaftarModal(false);
  };

  const handleCancelDaftar = () => {
    setShowDaftarModal(false);
  };

  return (
    <>
      <form>
        {/* Card */}
        <div className="p-4 bg-white border shadow rounded-xl sm:p-7 mb-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Formulir Pendaftaran TA
            </h2>
          </div>

          {/* Grid */}
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <label className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                NIM
              </label>

              <input
                type="text"
                value={nim}
                className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-lg shadow-sm pe-11  disabled:opacity-50 disabled:pointer-events-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                Nama Mahasiswa
              </label>

              <input
                type="text"
                value={nama}
                className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-lg shadow-sm pe-11  disabled:opacity-50 disabled:pointer-events-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                Judul Tugas Akhir
              </label>

              <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-lg shadow-sm pe-11  disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Enter your title"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                Kategori
              </label>

              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-lg shadow-sm pe-9  disabled:opacity-50 disabled:pointer-events-none"
                required
              >
                <option selected>Pilih kategori</option>
                <option>Laporan</option>
                <option>Paper Based</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                Pembimbing 1
              </label>

              <select
                value={pembimbing1}
                onChange={(e) => setPembimbing1(e.target.value)}
                className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-lg shadow-sm pe-9  disabled:opacity-50 disabled:pointer-events-none"
                required
              >
                <option selected>Pilih pembimbing 1</option>
                {dosenList.map((dosen) => (
                  <option key={dosen._id} value={dosen.nama}>
                    {dosen.nama}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                Pembimbing 2
              </label>

              <select
                value={pembimbing2}
                onChange={(e) => setPembimbing2(e.target.value)}
                className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-lg shadow-sm pe-9  disabled:opacity-50 disabled:pointer-events-none"
              >
                <option selected>Pilih pembimbing 2</option>
                {dosenList.map((dosen) => (
                  <option key={dosen._id} value={dosen.nama}>
                    {dosen.nama}
                  </option>
                ))}
                <option>-</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="inline-block text-sm font-medium text-gray-800 mt-2.5">
                Berkas
              </label>

              <label className="block p-4 text-center border-2 border-gray-200 border-dashed rounded-lg cursor-pointer group sm:p-7 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                <input
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
                <svg
                  className="mx-auto text-gray-400 size-10"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                  />
                  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                </svg>
                <span className="block mt-2 text-sm text-gray-800">
                  Browse your device or{" "}
                  <span className="text-sky-600 group-hover:text-sky-700">
                    drag &apos;n drop&apos;
                  </span>
                </span>
              </label>

              {error && <div className="text-red-500 mt-2">{error}</div>}

              {file && (
                <div className="mt-4">
                  <button
                    onClick={handleRemoveFile}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove File
                  </button>
                  {file.type === "application/pdf" && filePreview && (
                    <div className="mt-4">
                      <Document
                        file={filePreview}
                        onLoadError={(error) => {
                          setError("Failed to load PDF file.");
                          console.error("Error loading PDF:", error);
                        }}
                      >
                        <Page pageNumber={1} />
                      </Document>
                    </div>
                  )}
                </div>
              )}
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
              type="button"
              className="ml-2 inline-flex px-4 py-3 text-sm font-semibold text-white  rounded-lg gap-x-2 bg-gradient-to-tl from-teal-400 to-sky-500 hover:from-teal-500 hover:to-sky-600 disabled:opacity-50 disabled:pointer-events-none"
              onClick={handleDaftarClick}
            >
              Daftar
            </button>
          </div>
        </div>

        {showDaftarModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="relative bg-white rounded-lg px-12 py-10 shadow-lg max-w-xl z-50">
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
                  <p className="text-gray-600 mt-2">
                    Are you sure you want to submit this data?
                  </p>
                </div>
                <div className="flex justify-center">
                  <button
                    className="px-6 py-3 mr-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 "
                    onClick={handleCancelDaftar}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-l from-teal-400 to-sky-500 hover:from-teal-500 hover:to-sky-600 rounded-md  "
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
      <Toaster />
    </>
  );
}
