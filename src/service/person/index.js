import axios from 'axios'

export class PersonService {
  async getAllByRole(role) {
    const {
      data: {
        payload: { persons }
      }
    } = await axios.get(`http://localhost:3100/api/v1/person/role/${role}`)
    return persons
  }
}
