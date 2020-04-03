import configs from '../../config/default.json'
import { get } from 'lodash'

const config = {
  get(key) {
    return get(configs, key)
  }
}

export default config
