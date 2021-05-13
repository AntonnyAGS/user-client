import axios from '@/config/axios'
import { User, UserVars } from '@/types'

export class UserService {
  async register(user: UserVars): Promise<User> {
    try {
      const { data } = await axios.post<{ user: User }>('/user', user)
      return data.user
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }
}

export default UserService
