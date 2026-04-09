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

export type Cita = {
  nombre: string,
  telefono: string,
  fecha_hora: string,
  costo?: Number,
  user_id: string
}