import { API } from "../_api"; // Asumsikan ini adalah instance Axios atau sejenisnya

// Fungsi untuk mendapatkan semua penulis
export const getAuthors = async () => {
    try {
        const { data } = await API.get("/authors");
        // Asumsi API Anda mengembalikan data dalam properti 'data'
        return data.data;
    } catch (error) {
        console.error("Error fetching authors:", error);
        throw new Error("Failed to fetch authors."); // Lempar error untuk penanganan di komponen
    }
};

// Fungsi untuk mendapatkan penulis berdasarkan ID
export const getAuthorById = async (id) => {
    try {
        const { data } = await API.get(`/authors/${id}`);
        // Asumsi API Anda mengembalikan data dalam properti 'data'
        if (!data || !data.data) {
            throw new Error(`Author with ID ${id} not found.`);
        }
        return data.data;
    } catch (error) {
        console.error(`Error fetching author with ID ${id}:`, error);
        throw error;
    }
};

// Fungsi untuk membuat penulis baru
export const createAuthor = async (authorData) => {
    try {
        const response = await API.post("/authors", authorData);
        return response.data;
    } catch (error) {
        console.error("Error creating author:", error);
        throw error;
    }
};

// Fungsi untuk memperbarui penulis
export const updateAuthor = async (id, authorData) => {
    try {
        // Menggunakan POST dengan _method: 'PUT' untuk kompatibilitas Laravel atau
        // jika API Anda tidak mendukung PUT/PATCH langsung dari form data
        // Jika API Anda mendukung PUT/PATCH langsung, Anda bisa menggunakan:
        // const response = await API.put(`/authors/${id}`, authorData);
        const response = await API.post(`/authors/${id}`, {
            ...authorData,
            _method: 'PUT' // Penting untuk spoofing method di Laravel jika menggunakan POST
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating author with ID ${id}:`, error);
        throw error;
    }
};

// Fungsi untuk menghapus penulis
export const deleteAuthor = async (id) => {
    try {
        const response = await API.delete(`/authors/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting author with ID ${id}:`, error);
        throw new Error("Failed to delete author."); // Lempar error untuk penanganan di komponen
    }
};