import { toast } from "react-toastify"
import type { ToastPosition } from "react-toastify"


export const createToast = (status: string, message: string,  position: ToastPosition = 'bottom-right', theme: string = 'dark') => {

    if (status == 'success') {
        return toast.success(message, {
            position,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: theme,
        });
    }

    if (status == 'info') {
        return toast.info(message, {
            position,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: theme,
        });
    }

    if (status == 'warn') {
        return toast.warn(message, {
            position,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: theme,
        });
    }

    if (status == 'error') {
        return toast.error(message, {
            position,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: theme,
        });
    }

}