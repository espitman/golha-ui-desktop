import axios from 'axios'

export class PersonService {
  constructor(database) {
    this.database = database
  }

  async connectToDb() {
    return this.db || (await this.database.connect())
  }

  async getAllByRole(role) {
    this.db = await this.connectToDb()

    const getFromLocalDb = async () => {
      const persons = await this.db.person.find().exec()
      return persons.length ? persons.map((person) => person.toJSON()) : null
    }
    const getFromServer = async () => {
      const {
        data: {
          payload: { persons }
        }
      } = await axios.get(`http://localhost:3100/api/v1/person/role/${role}`)
      const promises = []
      persons.map((person) => {
        const { _id: id, name, image } = person
        promises.push(this.db.person.insert({ id, name, image }))
      })
      return await Promise.all(promises)
    }
    return (await await getFromLocalDb()) || (await getFromServer())
  }

  async getPersonTracks(personId) {
    const {
      data: {
        payload: { info, count, tracks }
      }
    } = await axios.get(`http://localhost:3100/api/v1/person/${personId}`)
    return { info, count, tracks }
  }
}
