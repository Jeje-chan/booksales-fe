import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showGenre, updateGenre } from "../../../_services/genres";

export default function GenreEdit() {
    // Mengambil parameter 'id' dari URL
    const { id } = useParams();
    // Hook untuk navigasi programatik
    const navigate = useNavigate();

    // State untuk data form genre
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        _method: "PUT", // Untuk method spoofing di Laravel
    });

    // State untuk status loading saat mengambil data genre
    const [isLoading, setIsLoading] = useState(true);
    // State untuk menangani error
    const [error, setError] = useState(null);

    // Fungsi untuk menangani perubahan input form
    // Menggunakan useCallback untuk stabilitas fungsi
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }, []); // Tidak ada dependensi karena menggunakan functional update

    // Fungsi untuk menangani submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Hapus error sebelumnya saat submit

        try {
            const payload = new FormData();
            // Menambahkan data form ke FormData.
            // FormData diperlukan jika Anda ingin konsisten dengan updateBook
            // yang mungkin memerlukan penanganan file meskipun di sini tidak ada.
            // Jika Anda hanya mengirim JSON, Anda bisa langsung mengirim formData.
            for (const key in formData) {
                payload.append(key, formData[key]);
            }

            await updateGenre(id, payload);
            alert("Genre updated successfully!");
            navigate("/admin/genres"); // Navigasi kembali ke daftar genre
        } catch (err) {
            console.error("Error updating genre:", err);
            alert("Failed to update genre. Please check your input and try again.");
            setError("Failed to update genre. Please check your input and try again.");
        }
    };

    // useEffect untuk mengambil data genre saat komponen dimuat
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null); // Bersihkan error sebelumnya

            try {
                const genreData = await showGenre(id); // Mengambil data genre spesifik

                // Mengisi formData dengan data genre yang diambil
                setFormData({
                    name: genreData.name || "",
                    description: genreData.description || "",
                    _method: "PUT",
                });
            } catch (err) {
                console.error("Error fetching genre details:", err);
                setError("Failed to load genre details. The genre might not exist or there was a network issue.");
                // Redirect ke halaman daftar genre jika ada error fatal
                navigate("/admin/genres", { replace: true });
            } finally {
                setIsLoading(false); // Selesai loading
            }
        };

        // Memastikan ID ada sebelum mencoba mengambil data
        if (id) {
            fetchData();
        } else {
            setError("No genre ID provided for editing.");
            setIsLoading(false);
            navigate("/admin/genres", { replace: true });
        }
    }, [id, navigate]); // Dependensi useEffect: 'id' dan 'navigate'

    // Tampilan saat loading
    if (isLoading) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                <p className="text-gray-900 dark:text-white">Loading genre details...</p>
            </section>
        );
    }

    // Tampilan saat terjadi error
    if (error) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                <p className="text-red-500 dark:text-red-400 font-semibold">{error}</p>
            </section>
        );
    }

    // Tampilan form edit genre
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Edit Genre
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        {/* Input Nama Genre */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Genre Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                placeholder="Enter genre name"
                                required
                            />
                        </div>
                        {/* Input Deskripsi Genre */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="6"
                                value={formData.description}
                                onChange={handleChange}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                placeholder="Write a genre description here..."
                            ></textarea>
                        </div>
                    </div>
                    {/* Tombol Aksi */}
                    <div className="flex items-center space-x-4">
                        <button
                            type="submit"
                            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button" // Pastikan type="button" untuk mencegah submit tidak disengaja
                            onClick={() => navigate("/admin/genres")} // Kembali ke daftar genre
                            className="text-gray-600 inline-flex items-center hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}