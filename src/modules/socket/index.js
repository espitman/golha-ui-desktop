import io from 'socket.io-client'

const authorization =
  // eslint-disable-next-line max-len
  '@eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVlYTM0OWQwMGRkYWQ3MzI0OTA1MjgyZCIsImZuYW1lIjoic2FlZWQiLCJsbmFtZSI6ImhlaWRhcmkiLCJ1c2VybmFtZSI6IjA5MTIyODk0MzMxIiwibW9iaWxlIjoiMDkxMjI4OTQzMzEifSwiaWF0IjoxNTg3ODQ4NzQ5LCJleHAiOjE1ODc5MzUxNDl9.H2G9WxV4WN1ZU8BlpK3SZF8UVnx5_luZMbf8vT3pS0I'

export class Socket {
  constructor() {
    this.socket = io('http://localhost:3100')
  }

  emit(event, data) {
    const content = {
      authorization,
      event,
      data: JSON.stringify(data)
    }
    console.log({ content })
    this.socket.emit('events', content)
  }
}
