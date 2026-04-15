import { toast } from "react-toastify"
import type { ToastPosition } from "react-toastify"

export const createToast = (status: string, message: string, position: ToastPosition = 'bottom-right', theme: string = 'dark') => {

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

export function formatFecha(fecha: string): string {
  const d = new Date(fecha + "T00:00:00");
  return d.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" });
}

export function formatFechaCorta(fecha: string): string {
  const d = new Date(fecha + "T00:00:00");
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const manana = new Date(hoy); manana.setDate(hoy.getDate() + 1);
  if (d.getTime() === hoy.getTime()) return "Hoy";
  if (d.getTime() === manana.getTime()) return "Mañana";
  return d.toLocaleDateString("es-MX", { weekday: "short", day: "numeric", month: "short" });
}

export function getInitials(nombre: string): string {
  return nombre.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
}
