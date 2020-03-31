import axios from 'axios'

export class DastgahService {
  constructor(database) {
    this.database = database
  }

  async connectToDb() {
    return this.db || (await this.database.connect())
  }

  async getAll() {
    this.db = await this.connectToDb()
    const getFromLocalDb = async () => {
      if (!this.database.isEnable()) {
        return null
      }
      const dastgah = await this.db.dastgah.find().sort('-count').exec()
      return dastgah.length ? dastgah.map((dsg) => dsg.toJSON()) : null
    }
    const getFromServer = async () => {
      const {
        data: {
          payload: { programs: dastgah }
        }
      } = await axios.get('http://localhost:3100/api/v1/dastgah')
      const promises = []
      const result = []
      dastgah.map(async (program) => {
        const { count, title } = program
        result.push({ count, title })
        promises.push(this.db.dastgah.insert({ count, title }))
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
}
