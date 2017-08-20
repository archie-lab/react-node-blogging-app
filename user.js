const MongoClient = require('mongodb').MongoClient

const mongodbUrl = 'mongodb://localhost:27017/blog'

module.exports = {

  signup: function (name, email, password) {
    MongoClient.connect(mongodbUrl, (err, db) => {
      db.collection('users').insertOne({
          'name': name,
          'email': email,
          'password': password
        },
        (err, result) => {
          console.log('error', err)
          console.log(`Saved user with email: ${email}, result: ${result}`)
        })
    })
  },

  signin: function (email, password, callback) {
    MongoClient.connect(mongodbUrl, (err, db) => {
      db.collection('users').findOne({
          'email': email,
          'password': password
        },
        (err, result) => {
          console.log('find user error', err)
          console.log('find user result', result)
          if (result) {
            callback(true)
          } else {
            callback(false)
          }
        })
    })
  }

}
