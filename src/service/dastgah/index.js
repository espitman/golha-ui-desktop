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
      const result = []
      dastgah.map(async (program) => {
        try {
          const { count, title } = program
          result.push({ count, title })
          this.db.dastgah.insert(result)
        } catch (error) {
          // do nothing
        }
      })

      return result
    }
    return (await getFromLocalDb()) || (await getFromServer())
  }
}
