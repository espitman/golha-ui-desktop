import axios from 'axios'
import config from '../../modules/config'

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
      } = await axios.get(`${config.get('api.v1.url')}/person/role/${role}`)
      const promises = []
      const result = []
      persons.forEach((person) => {
        const { _id: id, name, image } = person
        result.push({ id, name, image })
        promises.push(this.db.person.insert({ id, name, image }))
      })
      try {
        await Promise.all(promises)
      } catch (error) {
        // do nothing
      }
      return result
    }
    return (await getFromLocalDb()) || (await getFromServer())
  }

  async getPersonTracks(personId) {
    this.db = await this.connectToDb()
    const getFromLocalDb = async () => {
      if (!this.database.isEnable()) {
        return null
      }
      const personsTracks = await this.db.ptracks
        .find()
        .where('id')
        .eq(personId)
        .exec()
      return personsTracks.length ? personsTracks[0].toJSON() : null
    }
    const getFromServer = async () => {
      const {
        data: {
          payload: {
            info: { _id: id, name, image },
            count,
            tracks
          }
        }
      } = await axios.get(`${config.get('api.v1.url')}/person/${personId}`)
      const promises = []
      promises.push(this.db.ptracks.insert({ id, name, image, count, tracks }))
      try {
        await Promise.all(promises)
      } catch (error) {
        // do nothing
      }
      return { id, name, image, count, tracks }
    }
    return (await getFromLocalDb()) || (await getFromServer())
  }
}
