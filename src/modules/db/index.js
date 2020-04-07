import RxDB from 'rxdb'
import adapter from 'pouchdb-adapter-idb'
import config from '../../modules/config'
RxDB.plugin(adapter)
// RxDB.removeDatabase('golha', 'idb')

const programSchema = {
  version: 0,
  type: 'object',
  properties: {
    count: {
      type: 'number'
    },
    name: {
      type: 'string',
      primary: true
    },
    title: {
      type: 'string'
    }
  },
  required: ['count', 'name', 'title']
}

const personSchema = {
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    name: {
      type: 'string'
    },
    image: {
      type: 'string'
    }
  },
  required: ['id', 'name']
}

const dastgahSchema = {
  version: 0,
  type: 'object',
  properties: {
    count: {
      type: 'number',
      index: true
    },
    title: {
      type: 'string',
      primary: true
    }
  },
  required: ['count', 'title']
}

const personTracksSchema = {
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    name: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    count: {
      type: 'object'
    },
    tracks: {
      type: 'array'
    }
  },
  required: ['id', 'name']
}

const programTracksSchema = {
  version: 0,
  type: 'object',
  properties: {
    name: {
      type: 'string',
      primary: true
    },
    tracks: {
      type: 'array'
    }
  },
  required: ['name']
}

const dastgahTracksSchema = {
  version: 0,
  type: 'object',
  properties: {
    title: {
      type: 'string',
      primary: true
    },
    tracks: {
      type: 'array'
    }
  },
  required: ['title']
}

const roleSchema = {
  version: 0,
  type: 'object',
  properties: {
    name: {
      type: 'string',
      primary: true
    },
    persons: {
      type: 'array'
    },
    instruments: {
      type: 'array'
    }
  },
  required: ['name']
}

export class Database {
  isEnable() {
    return config.get('db.local.enable')
  }

  async connect() {
    const db = await RxDB.create({
      name: 'golha',
      adapter: 'idb',
      multiInstance: true,
      queryChangeDetection: false,
      ignoreDuplicate: true
    })

    await db.collection({
      name: 'program',
      schema: programSchema,
      autoMigrate: true
    })

    await db.collection({
      name: 'person',
      schema: personSchema,
      autoMigrate: true
    })

    await db.collection({
      name: 'dastgah',
      schema: dastgahSchema,
      autoMigrate: true
    })

    await db.collection({
      name: 'ptracks',
      schema: personTracksSchema,
      autoMigrate: true
    })

    await db.collection({
      name: 'prgtracks',
      schema: programTracksSchema,
      autoMigrate: true
    })

    await db.collection({
      name: 'dsgtracks',
      schema: dastgahTracksSchema,
      autoMigrate: true
    })

    await db.collection({
      name: 'roles',
      schema: roleSchema,
      autoMigrate: true
    })

    return db
  }
}
