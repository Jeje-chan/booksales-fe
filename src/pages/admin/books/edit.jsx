import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGenres } from "../../../_services/genres";
import { getAuthors } from "../../../_services/authors";
import { showBook, updateBook } from "../../../_services/books";

export default function BookEdit() {
    // Mengambil parameter 'id' dari URL
    const { id } = useParams();
    // Hook untuk navigasi programatik
    const navigate = useNavigate();

    // State untuk menyimpan daftar genre dan author
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);

    // State untuk data form buku
    const [formData, setFormData] = useState({
        title: "",
        price: 0,
        stock: 0,
        genre_id: "", // Inisialisasi string kosong agar opsi "---Select Genre---" terpilih
        author_id: "", // Inisialisasi string kosong agar opsi "---Select Author---" terpilih
        cover_photo: null, // Akan menampung objek File baru jika dipilih
        description: "",
        _method: "PUT", // Digunakan untuk method spoofing di Laravel
    });

    // State untuk URL foto cover saat ini (untuk ditampilkan)
    const [currentCoverPhoto, setCurrentCoverPhoto] = useState("");
    // State untuk status loading
    const [isLoading, setIsLoading] = useState(true);
    // State untuk menangani error saat mengambil atau mengirim data
    const [error, setError] = useState(null);

    // Fungsi untuk menangani perubahan input form
    // Menggunakan useCallback untuk mencegah re-render yang tidak perlu dari fungsi ini
    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        if (name === "cover_photo") {
            setFormData((prevData) => ({
                ...prevData,
                cover_photo: files[0], // Menyimpan objek File yang sebenarnya
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    }, []); // Tidak ada dependensi karena menggunakan functional update untuk state

    // Fungsi untuk menangani submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Hapus error sebelumnya saat submit

        try {
            const payload = new FormData();

            // Memasukkan semua data dari formData ke objek FormData
            for (const key in formData) {
                // Hanya masukkan 'cover_photo' jika ada file baru yang dipilih (objek File)
                if (key === "cover_photo") {
                    if (formData.cover_photo instanceof File) {
                        payload.append(key, formData.cover_photo);
                    }
                } else {
                    payload.append(key, formData[key]);
                }
            }

            // Memanggil fungsi updateBook untuk mengirim data ke API
            await updateBook(id, payload);
            alert("Book updated successfully!");
            navigate("/admin/books"); // Navigasi kembali ke daftar buku setelah berhasil
        } catch (err) {
            console.error("Error updating book:", err);
            // Memberikan pesan error yang lebih informatif
            alert("Failed to update book. Please check your input and try again.");
            setError("Failed to update book. Please check your input and try again.");
        }
    };

    // useEffect untuk mengambil data buku, genre, dan author saat komponen dimuat
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null); // Bersihkan error sebelumnya

            try {
                // Mengambil semua data secara bersamaan menggunakan Promise.all
                const [genresData, authorsData, bookData] = await Promise.all([
                    getGenres(),
                    getAuthors(),
                    showBook(id), // Akan memicu error jika buku tidak ditemukan
                ]);

                // Mengisi state dengan data yang diambil
                setGenres(genresData);
                setAuthors(authorsData);

                // Mengisi formData dengan detail buku yang diambil
                setFormData({
                    title: bookData.title || "",
                    price: bookData.price || 0,
                    stock: bookData.stock || 0,
                    // Pastikan ID dikonversi ke string agar cocok dengan value di elemen <select>
                    genre_id: String(bookData.genre_id || ""),
                    author_id: String(bookData.author_id || ""),
                    cover_photo: null, // Selalu mulai dengan null untuk pilihan file baru
                    description: bookData.description || "",
                    _method: "PUT",
                });
                // Menyimpan URL foto cover saat ini untuk ditampilkan
                setCurrentCoverPhoto(bookData.cover_photo || "");
            } catch (err) {
                console.error("Error fetching book details:", err);
                setError("Failed to load book details. The book might not exist or there was a network issue.");
                // Redirect ke halaman daftar buku jika ada error fatal (misal: buku tidak ditemukan)
                navigate("/admin/books", { replace: true });
            } finally {
                setIsLoading(false); // Selesai loading
            }
        };

        // Memastikan ID ada sebelum mencoba mengambil data
        if (id) {
            fetchData();
        } else {
            // Handle jika ID tidak disediakan di URL
            setError("No book ID provided for editing.");
            setIsLoading(false);
            navigate("/admin/books", { replace: true });
        }
    }, [id, navigate]); // Dependensi useEffect: 'id' dan 'navigate'

    // Tampilan saat loading
    if (isLoading) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                <p className="text-gray-900 dark:text-white">Loading book details...</p>
            </section>
        );
    }

    // Tampilan saat terjadi error
    if (error) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-white dark:bg-900">
                <p className="text-red-500 dark:text-red-400 font-semibold">{error}</p>
            </section>
        );
    }

    // Tampilan form edit buku
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Edit Book
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        {/* Input Judul Buku */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="title"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Book Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                placeholder="Enter book title"
                                required
                            />
                        </div>
                        {/* Input Harga */}
                        <div className="w-full">
                            <label
                                htmlFor="price"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                placeholder="e.g. 15000"
                                required
                            />
                        </div>
                        {/* Input Stok */}
                        <div className="w-full">
                            <label
                                htmlFor="stock"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Stock
                            </label>
                            <input
                                type="number"
                                name="stock"
                                id="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                placeholder="e.g. 20"
                                required
                            />
                        </div>
                        {/* Dropdown Genre */}
                        <div>
                            <label
                                htmlFor="genre_id"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Genre
                            </label>
                            <select
                                id="genre_id"
                                name="genre_id"
                                value={formData.genre_id}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                            >
                                <option value="">---Select Genre---</option>
                                {genres.map((genre) => (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Dropdown Author */}
                        <div>
                            <label
                                htmlFor="author_id"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Author
                            </label>
                            <select
                                id="author_id"
                                name="author_id"
                                value={formData.author_id}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                            >
                                <option value="">---Select Author---</option>
                                {authors.map((author) => (
                                    <option key={author.id} value={author.id}>
                                        {author.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Input Cover Photo */}
                        <div className="w-full">
                            <label
                                htmlFor="cover_photo"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Cover Photo
                            </label>
                            {/* Menampilkan foto cover saat ini jika ada */}
                            {currentCoverPhoto && (
                                <div className="mb-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Current Cover:</p>
                                    <img
                                        src={currentCoverPhoto}
                                        alt="Current Book Cover"
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                name="cover_photo"
                                id="cover_photo"
                                accept="image/*"
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Leave empty to keep the current photo.</p>
                        </div>
                        {/* Input Deskripsi */}
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
                                placeholder="Write a book description here..."
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
                            onClick={() => navigate("/admin/books")} // Kembali ke daftar buku
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