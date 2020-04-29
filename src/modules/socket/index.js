import io from 'socket.io-client'
import config from './../config'
import storage from '../storage'

const { token } = storage.get('user')

export class Socket {
  constructor() {
    this.socket = io(config.get('socket.url'))
  }

  emit(event, data) {
    const content = {
      authorization: token,
      data: JSON.stringify(data)
    }
    this.socket.emit(event, content)
  }
}
