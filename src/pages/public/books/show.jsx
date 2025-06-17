import { Link, useNavigate, useParams } from "react-router-dom";
import { showBook } from "../../../_services/books";
import { useEffect, useState } from "react";
import { bookImageStorage } from "../../../_api";
import { createTransaction } from "../../../_services/transactions";

export default function ShowBook() {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        const fetchData = async () => {
            const [booksData] = await Promise.all([showBook(id)]);
            setBook(booksData);
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!accessToken) {
            navigate("/login");
            return;
        }

        try {
            const payload = {
                book_id: id,
                quantity: quantity,
            };

            await createTransaction(payload);
            alert("Pembelian Berhasil");
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    // Handler untuk tambah ke keranjang (bisa dihubungkan ke context/redux)
    const handleAddToCart = () => {
        // Tambahkan logic keranjang di sini
        alert("Berhasil ditambahkan ke keranjang!");
    };

    return (
        <>
            {!book ? (
                <div className="text-center py-10 text-gray-500">
                    Loading...
                </div>
            ) : (
                <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
                    <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                                <img
                                    className="mx-auto h-full dark:hidden"
                                    src={`${bookImageStorage}/${book.cover_photo}`}
                                    alt={book.title}
                                />
                            </div>

                            <div className="mt-6 sm:mt-8 lg:mt-0">
                                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                                    {book.title}
                                </h1>
                                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                                    <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                                        Rp. {book.price}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                        <div className="flex items-center gap-1">
                                            <svg
                                                className="w-5 h-5 -ms-2 me-2"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                                                />
                                            </svg>
                                            {[...Array(4)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-4 h-4 text-yellow-300"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                                </svg>
                                            ))}
                                            <svg
                                                className="w-4 h-4 text-yellow-300"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                                            (5.0)
                                        </p>
                                        <a
                                            href="#"
                                            className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                                        >
                                            345 Reviews
                                        </a>
                                    </div>
                                </div>

                                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="mt-6 sm:mt-8 space-y-4"
                                    >
                                        <div>
                                            <label
                                                htmlFor="quantity"
                                                className="block text-sm font-medium text-gray-700 dark:text-white"
                                            >
                                                Jumlah
                                            </label>
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                value={quantity}
                                                min={1}
                                                onChange={(e) =>
                                                    setQuantity(e.target.value)
                                                }
                                                className="mt-1 block w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                className="text-white mt-4 sm:mt-0 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                                            >
                                                Buy
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleAddToCart}
                                                className="text-white mt-4 sm:mt-0 bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
                                            >
                                                <i className="fi fi-rr-shopping-cart text-2xl mr-2"></i>
                                                Tambahkan Ke Keranjang
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                                <p className="mb-6 text-gray-500 dark:text-gray-400">
                                    {book ? book.description : "Loading..."}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
