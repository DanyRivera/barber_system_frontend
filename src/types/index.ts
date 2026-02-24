export type User = {
    nombre: String,
    apellido: String,
    email: String,
  }

export type RegisterForm = Pick<User, 'nombre' | 'apellido' | 'email'> & {
    password: String,
    repeatPassword: String
  }
