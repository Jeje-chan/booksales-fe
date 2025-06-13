import axios from "axios";

// const url = "https://akmal-bc.karyakreasi.id";
const url = "http://127.0.0.1:8000"

export const API = axios.create({
    baseURL: `${url}/api`, // HANYA 1x /api
});

export const bookImageStorage = `${url}/storage/books/`;

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});