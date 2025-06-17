import { Link } from "react-router-dom";
import Navbar from "./navbar";

export default function Hero() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                <Link
                    to={"#"}
                    className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    role="alert"
                >
                    <span className="text-xs bg-indigo-600 rounded-full text-white px-4 py-1.5 mr-3">
                        Promo
                    </span>{" "}
                    <span className="text-sm font-medium">
                        Buku Baru Telah Hadir! Dapatkan Diskon Menarik!
                    </span>
                    <svg
                        className="ml-2 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </Link>
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    Temukan Buku Favoritmu di Toko Buku Online Kami
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                    Jelajahi ribuan judul buku dari berbagai genre. Dapatkan
                    penawaran menarik dan promo spesial setiap hari. Ayo mulai
                    petualangan literasimu bersama kami!
                </p>
                <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                    <span className="font-semibold text-gray-400 uppercase">
                        DIPERCAYA OLEH
                    </span>
                    <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
                        <Link to={"#"} className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                            {/* Logo media partner */}
                            <svg className="h-8" viewBox="0 0 132 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="..." fill="currentColor" />
                            </svg>
                        </Link>
                        <Link to={"#"} className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                            {/* Logo media partner lainnya */}
                            <svg className="h-11" viewBox="0 0 208 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="..." fill="currentColor" />
                            </svg>
                        </Link>
                        <Link to={"#"} className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                            {/* Logo lain */}
                            <svg className="h-11" viewBox="0 0 120 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="..." fill="currentColor" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
