const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongodbUrl = "mongodb://localhost:27017/blog";

module.exports = {

  addPost: function (title, subject, callback) {
    MongoClient.connect(mongodbUrl, (err, db) => {
      db.collection('posts').insertOne({
            "title": title,
            "subject": subject,
          },
          (err, result) => {
            console.log('error', err);
            console.log(`Saved post with title: ${title}, result: ${result}`)
            if (err === null) {
              callback(true);
            } else {
              callback(false);
            }
          });
    })
  },

  getPosts: function (callback) {
    MongoClient.connect(mongodbUrl, (err, db) => {
      db.collection('posts').find().toArray((err, list) => callback(list));
    })
  },

  getPost: function (id, callback) {
    MongoClient.connect(mongodbUrl, (err, db) => {
      db.collection('posts').findOne({_id: new mongodb.ObjectID(id)},
          (err, result) => {
            callback(result)
          });
    })
  },

  updatePost: function (id, title, subject, callback) {
    MongoClient.connect(mongodbUrl, (err, db) => {
      db.collection('posts').updateOne({_id: new mongodb.ObjectID(id)}, {
            "title": title,
            "subject": subject,
          },
          (err, result) => {
            console.log('error', err);
            console.log(`Updated post with id=${id}`)
            if (err === null) {
              callback(true);
            } else {
              callback(false);
            }
          });
    })
  },

  deletePost: function (id, callback) {
    MongoClient.connect(mongodbUrl, (err, db) => {
      db.collection('posts').deleteOne({_id: new mongodb.ObjectID(id)},
          (err, result) => {
            callback(result)
          });
    })
  },

  signup: function (name, email, password) {
    MongoClient.connect(mongodbUrl, (err, db) => {
      db.collection('users').insertOne({
            "name": name,
            "email": email,
            "password": password
          },
          (err, result) => {
            console.log('error', err);
            console.log(`Saved user with email: ${email}, result: ${result}`)
          });
    })
  },

  signin: function (email, password, callback) {
    MongoClient.connect(mongodbUrl, (err, db) => {
      db.collection('users').findOne({
            "email": email,
            "password": password
          },
          (err, result) => {
            console.log('find user error', err);
            console.log('find user result', result);
            if (result) {
              callback(true);
            } else {
              callback(false);
            }
          });
    })
  }

};