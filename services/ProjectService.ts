import axios from '@/config/axios'
import { Project, ProjectInput } from '@/types'
import Cookie from 'js-cookie'

export class ProjectService {
  async create(project: ProjectInput): Promise<Project> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.post<Project>('/project', project, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  async projects(): Promise<Project[]> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.get<Project[]>('/project', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }
}

export default ProjectService
