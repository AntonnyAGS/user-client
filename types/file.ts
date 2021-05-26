import { FileType } from '~/enum'

export type ArchiveInput = {
  fileName: string
  fileType: string
  file: File | null
}

export type ArchiveVars = {
  fileName: string
  fileType: string
  base64: string
}

export type Archive = {
  _id: string
  projectId: string
  fileName: string
  fileType: FileType
  tag: string
}
