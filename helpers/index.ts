import { PersonType, FileType } from '@/enum'
export * from './utils'
export * from './validate'
export * from './records'

export const UserPersonText: Record<PersonType, string> = {
  [PersonType.COMPANY]: 'Pessoa Jurídica',
  [PersonType.PERSON]: 'Pessoa Física'
}

export const FileText: Record<FileType, string> = {
    [FileType.LOGO]: 'Logo',
    [FileType.REQUIREMENTS_DOCUMENT]: 'Requerimentos'
}

export function formatCpf (cpf: string): string {
  if (!cpf) { return '' }
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export function formatCnpj (cnpj: string): string {
  if (!cnpj) { return '' }
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}