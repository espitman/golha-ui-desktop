import axios from 'axios'
import config from '../../modules/config'
import storage from '../../modules/storage'

export class UserService {
  async getLastState() {
    const { token } = storage.get('user')
    console.log(token)
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

  async signin(username, password) {
    try {
      const result = await axios.post(
        `${config.get('userciry.url')}/user/signin`,
        {
          username,
          password
        }
      )
      return result.data.payload
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  async signup(password, fname, lname, email, mobile) {
    try {
      const result = await axios.post(
        `${config.get('userciry.url')}/user/signup`,
        {
          password,
          fname,
          lname,
          email,
          mobile
        }
      )
      return result.data.payload
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }
}
