import axios from 'axios'
import config from '../../modules/config'

const token = config.get('token')

export class UserService {
  async getLastState() {
    const {
      data: {
        payload: { currentTrack, currentTime, playlist }
      }
    } = await axios.get(`${config.get('api.v1.url')}/user/me`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    return { currentTrack, currentTime, playlist }
  }
}
