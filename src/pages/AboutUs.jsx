import React from "react";
import Navbar from "../components/navbar";

export default function AboutUs() {
    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-4">About Us</h1>
            <p className="mb-2">
                <b>BookSales</b> adalah platform penjualan buku online yang menyediakan berbagai koleksi buku terbaik untuk semua kalangan. Kami berkomitmen untuk memberikan pengalaman belanja buku yang mudah, cepat, dan aman.
            </p>
            <p className="mb-2">
                Tim kami terdiri dari pecinta buku dan profesional di bidang teknologi yang selalu berusaha menghadirkan layanan terbaik bagi pelanggan.
            </p>
            <p>
                Hubungi kami: <a href="mailto:info@booksales.com" className="text-indigo-600 underline">info@booksales.com</a>
            </p>
        </div>
    );
}