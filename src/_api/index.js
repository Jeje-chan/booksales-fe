import axios from "axios";

// const url = "https://akmal-bc.karyakreasi.id/api";
const url = "http://127.0.0.1:8000"

export const API = axios.create({
    baseURL: `${url}/api`,
});

export const bookImageStorage = `${url}/storage/books/`;

// Tambahkan interceptor untuk Authorization
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // ganti sesuai nama key token kamu
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

