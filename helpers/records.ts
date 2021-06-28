import { FileType, ProjectStatus } from '~/enum'

export const FileTypeToText: Record<FileType, string> = {
  [FileType.LOGO]: 'Logo',
  [FileType.REQUIREMENTS_DOCUMENT]: 'Documento de negócios',
}

export const StatusColor: Record<ProjectStatus, string> = {
  [ProjectStatus.APPROVED]: '#29CC97',
  [ProjectStatus.DOING]: '#FF9C33',
  [ProjectStatus.WAITING]: '#FEC400',
  [ProjectStatus.FINISHED]: '#2696E8',
  [ProjectStatus.REPROVED]: '#FF4C33',
}

export const StatusText: Record<ProjectStatus, string> = {
  [ProjectStatus.APPROVED]: 'Aprovado',
  [ProjectStatus.DOING]: 'Em andamento',
  [ProjectStatus.WAITING]: 'Em espera',
  [ProjectStatus.FINISHED]: 'Finalizado',
  [ProjectStatus.REPROVED]: 'Reprovado',
}
