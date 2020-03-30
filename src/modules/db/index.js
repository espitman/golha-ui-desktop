import RxDB from 'rxdb'
import adapter from 'pouchdb-adapter-idb'
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
      type: 'string'
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
      type: 'string'
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
      type: 'string'
    }
  },
  required: ['count', 'title']
}

export class Database {
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

    return db
  }
}
