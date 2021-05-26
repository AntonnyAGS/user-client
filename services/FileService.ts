import axios from '@/config/axios'
import { Archive, ArchiveVars } from '@/types'
import Cookie from 'js-cookie'

export class FileService {
  async create(projectId: string, files: ArchiveVars[]): Promise<Archive[]> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.post<Archive[]>(
        `/file/${projectId}`,
        files,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }
}

export default FileService
