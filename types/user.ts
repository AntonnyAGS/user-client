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
  personType?: PersonType
  role: UserRole
  phone: string
}

export type UserInput = {
  email: ''
  phone: ''
  cpfOrCnpj: string
  name: ''
  password: ''
  confirmPassword: ''
}
