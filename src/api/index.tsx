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

export const updateUser = async () => {
    try {
        const {data} = await api.put<User>('/update/profile');
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
    }
}
