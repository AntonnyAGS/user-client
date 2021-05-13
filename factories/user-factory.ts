import { PersonType, UserRole } from '~/enum'
import { UserInput, UserVars } from '~/types'

export class UserFactory {
  fromInputToVars(userInput: UserInput): UserVars {
    const cpfOrCnpjFormated = userInput.cpfOrCnpj.replace(/\D/g, '')
    const result: UserVars = {
      ...userInput,
      role: UserRole.CLIENT,
      personType: PersonType.COMPANY,
      cnpj: cpfOrCnpjFormated,
      phone: userInput.phone.replace(/\D/g, ''),
      password_repeat: userInput.confirmPassword,
    }

    if (cpfOrCnpjFormated.length === 11) {
      result.personType = PersonType.PERSON
      result.cpf = cpfOrCnpjFormated

      delete result.cnpj
    }

    return result
  }
}
