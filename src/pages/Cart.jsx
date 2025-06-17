import React from "react";

export default function Cart() {
    return (
        <div className="max-w-xl mx-auto py-10 px-4 text-center">
            <i className="fi fi-rr-shopping-cart text-5xl text-indigo-600 mb-4"></i>
            <h1 className="text-2xl font-bold mb-2">Keranjang Belanja</h1>
            <p className="mb-4">Belum ada barang di keranjang.</p>
            {/* Tambahkan daftar barang di sini */}
        </div>
    );
}