import { toBase64 } from '~/helpers'
import { ArchiveInput, ArchiveVars } from '~/types'

export class FileFactory {
  static async fromInputToVars(files: ArchiveInput[]): Promise<ArchiveVars[]> {
    return await Promise.all(
      files.map(async (file) => {
        const obj: ArchiveVars = {
          fileName: `${file.fileName}.${file.file?.name.split('.').pop()}`,
          fileType: file.fileType,
          base64: await toBase64(file.file),
        }

        return obj
      })
    ).then((res) => res)
  }
}
