import React from "react";

export default function ChatAdmin() {
    return (
        <div className="max-w-xl mx-auto py-10 px-4 text-center">
            <i className="fi fi-rr-comment text-5xl text-green-600 mb-4"></i>
            <h1 className="text-2xl font-bold mb-2">Contact Admin</h1>
            <p className="mb-4">Silakan kirim pesan atau pertanyaan Anda ke admin melalui form di bawah ini.</p>
            <form className="space-y-4">
                <input
                    type="text"
                    placeholder="Nama"
                    className="w-full border px-3 py-2 rounded"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border px-3 py-2 rounded"
                    required
                />
                <textarea
                    placeholder="Pesan"
                    className="w-full border px-3 py-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Kirim
                </button>
            </form>
        </div>
    );
}