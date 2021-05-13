import { PersonType, UserRole } from '~/enum'

export type User = {
  createdAt: Date
  email: string
  name: string
  id: string
  isAdmin: boolean
  ra?: string
  cpf?: string
  cnpj?: string
  personType: PersonType
  role: UserRole
  phone: string
}

export type UserVars = Omit<
  // eslint-disable-next-line camelcase
  User & { password_repeat: string },
  'id' | 'createdAt' | 'isAdmin'
>

export type UserInput = {
  email: ''
  phone: ''
  cpfOrCnpj: string
  name: ''
  password: ''
  confirmPassword: ''
}
