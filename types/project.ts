import { User } from './user'
import { ProjectStatus } from '~/enum'

export type Project = {
  createdAt: Date | string
  name: string
  _id: string
  status: ProjectStatus
  description: string
  updateAt: Date
  client: User
  clientId?: string
}

export type ProjectInput = {
  name: string
  description: string
}
