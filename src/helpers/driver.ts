import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const startTour = () => {
    const driverObj = driver({
        popoverClass: 'driverjs-theme',
        showProgress: false,
        steps: [
            { element: '#nombre-tour', popover: { title: 'Tu Nombre', description: 'Escribe tus nombres aquí!' } },
            { element: '#apellido-tour', popover: { title: 'Tu Apellido', description: 'Escribe tus apellidos aquí!' } },
            { element: '#correo-tour', popover: { title: 'Tu Correo', description: 'Escribe tu correo aquí!' } },
            { element: '#contraseña-tour', popover: { title: 'Tu Contraseña', description: 'Crea una contarseña!' } },
            { element: '#contraseña2-tour', popover: { title: 'Repite tu contraseña', description: 'Repite tu contraseña!' } },
            { element: '#enviar-tour', popover: { title: 'Registrarse', description: 'Click aquí para registrarse!' } },
            { element: '#login-tour', popover: { title: '¿Ya tienes una cuenta?', description: 'Inicia Sesión dando click aquí!' } },
        ]
    });

    driverObj.drive();
}

