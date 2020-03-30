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
      } = await axios.get('http://localhost:3100/api/v1/program')
      const promises = []
      programs.map(async (program) => {
        const { count, name, title } = program
        promises.push(this.db.program.insert({ count, name, title }))
      })
      return await Promise.all(promises)
    }
    return (await getFromLocalDb()) || (await getFromServer())
  }
}
