import { API } from "../_api"; // Assuming this is your axios instance or similar setup

export const getBooks = async () => {
    const { data } = await API.get("/books");
    return data.data;
};

export const createBook = async (data) => {
    try {
        const response = await API.post("/books", data);
        return response.data;
    } catch (error) {
        console.error("Error creating book:", error);
        throw error;
    }
};

export const showBook = async (id) => {
    try {
        const { data } = await API.get(`/books/${id}`);
        // This is crucial: Ensure data.data exists and is the book object
        if (!data || !data.data) {
            throw new Error(`Book with ID ${id} not found or invalid response.`);
        }
        return data.data; // Return the actual book object
    } catch (error) {
        console.error(`API Error: Could not fetch book with ID ${id}`, error);
        throw error; // Re-throw the error for the component to handle
    }
};
export const updateBook = async (id, data) => {
    try {
        // When sending FormData with _method: "PUT", make sure your backend
        // is configured to interpret this as a PUT request.
        const response = await API.post(`/books/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
};

export const deleteBook = async (id) => {
    try {
        return await API.delete(`/books/${id}`);
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
};