const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUSers);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const DB_HOST = config.dbHost;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {

  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = DB_NAME;
    // console.log('El cliente', this.client);
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }

          resolve(this.client.db(this.dbName));
          // console.log('estas conectado primor', MongoLib);
        });
      });
    }

    return MongoLib.connection;
  }

  getAll(collection, query) {
    // console.log('ESTAMOS EN EL MONGODB', collection, query)
    return this.connect().then(db => {
      return db
              .collection(collection)
              .find(query)
              .toArray()
    });
  }

  get(collection, id) {
    // console.log('ACTUALIZACION', id)
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id.movieId) });
    });
  }

  create(collection, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection).insertOne(data);
      })
      .then(result => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then(result => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
      .then(db => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id.movieId) });
      })
      .then(() => id);
  }
}

module.exports = {MongoLib};