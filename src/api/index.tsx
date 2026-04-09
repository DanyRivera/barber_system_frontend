import api from "../config/axios"
import { isAxiosError } from "axios";
import type { Cita, User } from "../types";

export const getUser = async () => {
    try {
        const { data } = await api<User>('/user');
        return data;
    } catch (error) {

        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
    }
}

export const updateUser = async (dataObj: User) => {
    try {
        const { data } = await api.put('/user', dataObj);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
    }
}


export const createAppointment = async (dataObj: Cita) => {
    try {
        const { data } = await api.post('/cita', dataObj);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
    }
}