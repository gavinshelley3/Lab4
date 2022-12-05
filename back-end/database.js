const mongopass = "DdJcIGmnMvI8GQnN";
const mongouser = "gavin";
const { MongoClient } = require("mongodb");

const mongostring = `mongodb+srv://${mongouser}:${mongopass}@cluster0.pr3lclv.mongodb.net/?retryWrites=true&w=majority`;

let db;
async function getDb() {
  if (db) return db;

  const client = new MongoClient(mongostring, { useUnifiedTopology: true });

  await client.connect();

  db = client.db("products");

  return db;
}

exports.getDb = getDb;
