// ...existing import...
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../_services/auth";

// ...existing code...

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const handleLogout = async () => {
        try {
            if (token) {
                await logout({ token });
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userInfo");
            navigate("/login");
        }
    };

    return (
        <>
            <header>
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <Link to={"/"} className="flex items-center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
                                className="mr-3 h-6 sm:h-9"
                                alt="Booksales Logo"
                            />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                Booksales
                            </span>
                        </Link>

                        <div className="flex items-center lg:order-2">
                            {token && userInfo ? (
                                <>
                                    <Link
                                        to={"/"}
                                        className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                                    >
                                        {userInfo.name}
                                    </Link>
                                    <Link
                                        to="/cart"
                                        className="mr-2 flex items-center"
                                    >
                                        <i className="fi fi-rr-shopping-cart text-2xl"></i>
                                    </Link>
                                    <Link
                                        to="/chat-admin"
                                        className="mr-2 flex items-center"
                                    >
                                        <i className="fi fi-rr-comment text-2xl"></i>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to={"login"}
                                        className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        to={"register"}
                                        className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                            {/* ...menu mobile button... */}
                        </div>
                        <div
                            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                            id="mobile-menu-2"
                        >
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <Link
                                        to={"/"}
                                        className="block py-2 pr-4 pl-3 text-white rounded bg-indigo-700 lg:bg-transparent lg:text-indigo-700 lg:p-0 dark:text-white"
                                        aria-current="page"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={"/books"}
                                        className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        Books
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={"/about"}
                                        className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
