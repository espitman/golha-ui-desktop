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
      if (!this.database.isEnable()) {
        return null
      }
      const persons = await this.db.person.find().sort('id').exec()
      return persons.length ? persons.map((person) => person.toJSON()) : null
    }
    const getFromServer = async () => {
      const {
        data: {
          payload: { persons }
        }
      } = await axios.get(`http://localhost:3100/api/v1/person/role/${role}`)
      const result = []
      persons.forEach((person) => {
        try {
          const { _id: id, name, image } = person
          result.push({ id, name, image })
          this.db.person.insert(result)
        } catch (error) {
          // do nothing
        }
      })
      return result
    }
    return (await getFromLocalDb()) || (await getFromServer())
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
