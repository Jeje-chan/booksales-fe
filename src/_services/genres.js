// _services/genres.js
import { API } from "../_api"; // Asumsikan ini adalah instance axios Anda

export const getGenres = async () => {
    const { data } = await API.get("/genres");
    return data.data;
};

export const createGenre = async (data) => {
    try {
        const response = await API.post("/genres", data);
        return response.data;
    } catch (error) {
        console.error("Error creating genre:", error);
        throw error;
    }
};

// --- FUNGSI BARU UNTUK EDIT ---

export const showGenre = async (id) => {
    try {
        const { data } = await API.get(`/genres/${id}`);
        if (!data || !data.data) {
            throw new Error(`Genre with ID ${id} not found.`);
        }
        return data.data;
    } catch (error) {
        console.error(`API Error: Could not fetch genre with ID ${id}`, error);
        throw error;
    }
};

export const updateGenre = async (id, data) => {
    try {
        // Untuk Laravel, Anda mungkin perlu mengirim _method: 'PUT'
        // Jika backend Anda menerima PATCH atau PUT langsung, Anda bisa menggunakan API.patch/put
        const response = await API.post(`/genres/${id}`, data); // Menggunakan POST dengan _method untuk PUT
        return response.data;
    } catch (error) {
        console.error("Error updating genre:", error);
        throw error;
    }
};

export const deleteGenre = async (id) => {
    try {
        return await API.delete(`/genres/${id}`);
    } catch (error) {
        console.error("Error deleting genre:", error);
        throw error;
    }
};