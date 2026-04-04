export type User = {
  nombre: String,
  apellido: String,
  email: String,
  _id: string
}

export type RegisterForm = Pick<User, 'nombre' | 'apellido' | 'email'> & {
  password: String,
  repeatPassword: String
}

export type LoginForm = Pick<User, 'email'> & {
  password: string
}