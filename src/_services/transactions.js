import { API } from "../_api";

export const getTransactions = async () => {
    const { data } = await API.get("/transactions");
    return data.data;
}

export const createTransaction = async (data) => {
    try {
        const response = await API.post("/transactions", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}