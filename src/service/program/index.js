import axios from 'axios'
import config from '../../modules/config'

export class ProgramService {
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
      const allPrograms = await this.db.program.find().exec()
      return allPrograms.length
        ? allPrograms.map((program) => program.toJSON())
        : null
    }
    const getFromServer = async () => {
      const {
        data: {
          payload: { programs }
        }
      } = await axios.get(`${config.get('api.v1.url')}/program`)
      const promises = []
      const result = []
      programs.map(async (program) => {
        const { count, name, title } = program
        result.push({ count, name, title })
        promises.push(this.db.program.insert({ count, name, title }))
      })
      try {
        return await Promise.all(promises)
      } catch (error) {
        // do nothing
      }
      return result
    }
    return (await getFromLocalDb()) || (await getFromServer())
  }
}
