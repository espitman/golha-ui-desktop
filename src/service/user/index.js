import axios from 'axios'
import config from '../../modules/config'

const token = config.get('token')

export class UserService {
  async getLastState() {
    const {
      data: {
        payload: { currentTrack, playlist }
      }
    } = await axios.get(`${config.get('api.v1.url')}/user/me`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    return { currentTrack, playlist }
  }
}
