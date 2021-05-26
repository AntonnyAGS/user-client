import { FileType } from '~/enum'

export const FileTypeToText: Record<FileType, string> = {
  [FileType.LOGO]: 'Logo',
  [FileType.REQUIREMENTS_DOCUMENT]: 'Documento de negócios',
}
