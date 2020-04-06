import axios from 'axios'
import config from '../../modules/config'

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
          payload: { dastgah }
        }
      } = await axios.get(`${config.get('api.v1.url')}/dastgah`)
      const promises = []
      const result = []
      dastgah.map(async (dsg) => {
        const { count, title } = dsg
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

  async geTracksByTitle(title) {
    this.db = await this.connectToDb()
    const getFromLocalDb = async () => {
      if (!this.database.isEnable()) {
        return null
      }
      const tracks = await this.db.dsgtracks
        .find()
        .where('title')
        .eq(title)
        .exec()
      return tracks.length ? tracks[0].tracks : null
    }
    const getFromServer = async () => {
      const {
        data: {
          payload: { tracks }
        }
      } = await axios.get(`${config.get('api.v1.url')}/dastgah/${title}`)
      const result = []
      tracks.map(async (track) => {
        const {
          _id,
          title,
          subtitle,
          dastgah,
          file,
          program,
          no,
          duration,
          singer
        } = track
        result.push({
          _id,
          title,
          subtitle,
          dastgah,
          file,
          program,
          no,
          duration,
          singer
        })
      })
      try {
        this.db.dsgtracks.insert({ title, tracks: result })
      } catch (error) {
        // do nothing
      }
      return result
    }
    return {
      title,
      tracks: (await getFromLocalDb()) || (await getFromServer())
    }
  }
}
