import axios from 'axios'

export class ProgramService {
  async getAll() {
    const {
      data: {
        payload: { programs }
      }
    } = await axios.get('http://localhost:3100/api/v1/program')
    return programs
  }
}
