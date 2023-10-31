const bcrypt = require('bcryptjs');
const ObjectId = require('mongodb').ObjectId;

const users = [
  {
    _id: ObjectId("64a99a6645b2417dba011234"),
    name: 'Kuba',
    lastName: 'Olszanecki',
    phoneNumber: '123456789',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    _id: ObjectId("64a99a6645b2417dba018214"),
    name: 'John',
    lastName: 'Doe',
    phoneNumber: '123456789',
    email: 'john@doe.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    _id: ObjectId("64a99a6645b2417dba018215"),
    name: 'Jane',
    lastName: 'Doe',
    phoneNumber: '123456789',
    email: 'jane@doe.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    _id: ObjectId("64a99a6645b2417dba018216"),
    name: "Emil",
    lastName: "Potato",
    phoneNumber: '123456789',
    email: "emil@potato.com",
    password: bcrypt.hashSync('123456', 10),
  },
  {
    _id: ObjectId("64a99a6645b2417dba018217"),
    name: "Emily",
    lastName: "Cucumber",
    phoneNumber: '123456789',
    email: "emily@cucumber.com",
    password: bcrypt.hashSync('123456', 10),
  },
  {
    _id: ObjectId("64a99a6645b2417dba018218"),
    name: "Alice",
    lastName: "Monroe",
    phoneNumber: '123456789',
    email: "alice@monroe.com",
    password: bcrypt.hashSync('123456', 10),
  },
  {
    _id: ObjectId("64a99a6645b2417dba018219"),
    name: "Andy",
    lastName: "Moris",
    phoneNumber: '123456789',
    email: "andy@moris.com",
    password: bcrypt.hashSync('123456', 10),
  },
]

module.exports = users;