//Profile
export type User = {
  nombre: string,
  apellido: string,
  email: string,
  _id: string
}

export type RegisterForm = Pick<User, 'nombre' | 'apellido' | 'email'> & {
  password: String,
  repeatPassword: String
}

export type LoginForm = Pick<User, 'email'> & {
  password: string
}

export type UpdateProfileForm = Pick<User, 'nombre' | 'apellido' | 'email'>

//Citas
export type FormCita = {
  nombre: string,
  telefono: string,
  fecha_hora?: string,
  costo?: number,
}

export type EstadoCita = "confirmada" | "pendiente" | "completada" | "cancelada";

export type Cita = {
  _id: string
  nombre: string,
  telefono: string,
  fecha: string,
  hora: string,
  costo?: number,
  user_id?: string
  estado: EstadoCita
}

//IA
export type Rol = "user" | "ia";

export interface Mensaje {
  id: string;
  rol: Rol;
  texto: string;
  hora: string;
}
