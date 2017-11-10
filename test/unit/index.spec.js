const test = require('ava')
const { initProxy, generateURL } = require('../../index')
const fixtures = require('../fixtures')
const { MongoClient } = require('mongodb')
const uuid = require('uuid')

test.before(async () => initProxy({ fixtures }))

test(async (t) => {
  let c = await MongoClient.connect(`mongodb://${process.env.MONGO_PRIMER_DB_HOST}:${process.env.MONGO_PRIMER_DB_PORT}/${uuid()}`)
  let collection = c.collection('puppies')
  await collection.insertOne({ name: 'Bo' })
  let count = await collection.find().count()
  t.is(count, 4)
})

test(async (t) => {
  let c = await MongoClient.connect(`mongodb://127.0.0.1:27018/${uuid()}`)
  let collection = c.collection('puppies')
  let count = await collection.find().count()
  t.is(count, 3)
})

test(t => {
  const a = generateURL()
  const b = generateURL()
  t.not(a, b)
  t.regex(a, /mongodb:\/\/.*:\d+\/(\w{8}(-\w{4}){3}-\w{12}?)/)
})



