import api from "../config/axios"
import { isAxiosError } from "axios";
import type { EstadoCita, FormCita, User } from "../types";

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

export const getApppointments = async () => {
    try {
        const { data } = await api('/citas');
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
    }
}

export const createAppointment = async (dataObj: FormCita) => {
    try {
        const { data } = await api.post('/cita', dataObj);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
    }
}

export const deleteAppointment = async (id: string) => {
    try {
        const { data } = await api.delete(`/cita/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
    }
}

export const updateAppointment = async (dataObj: FormCita & { id: string }) => {
    try {
        const { id, ...rest } = dataObj;
        const { data } = await api.patch(`/cita/${id}`, rest);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
    }
}

export const updateStatusAppointment = async ({ id, estado }: { id: string, estado: EstadoCita }) => {
    try {
        const { data } = await api.patch(`/cita/${id}/status`, { estado });
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
    }
}

export const chatIA = async (body: { messages: { role: "user" | "assistant"; content: string }[] }) => {
    try {
        const { data } = await api.post('/ia', body);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error)
        }
    }
}