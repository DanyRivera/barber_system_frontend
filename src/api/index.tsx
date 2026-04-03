import api from "../config/axios"
import { isAxiosError } from "axios";
import type { User } from "../types";

export const getUser = async () => {
    try {
        const {data} = await api<User>('/user');
        return data;
    } catch (error) {

        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
    }
}