import axios from 'axios'

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
      const programs = await this.db.program.find().exec()
      return programs.length
        ? programs.map((program) => program.toJSON())
        : null
    }
    const getFromServer = async () => {
      const {
        data: {
          payload: { programs }
        }
      } = await axios.get('http://localhost:3100/api/v1/program')
      // const promises = []
      const result = []
      programs.map(async (program) => {
        try {
          const { count, name, title } = program
          result.push({ count, name, title })
          this.db.program.insert(result)
        } catch (error) {
          // do nothing
        }
      })
      return result
    }
    return (await getFromLocalDb()) || (await getFromServer())
  }
}
