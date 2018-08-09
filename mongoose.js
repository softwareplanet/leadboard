var mongoose = require('mongoose');

var MONGODB_URL = 'mongodb://localhost:27017/leadster' + (process.env.NODE_ENV === 'test'? '-test': '')
console.log('Using: ' + MONGODB_URL)

mongoose.Promise = Promise
var promise = mongoose.connect(MONGODB_URL, {useMongoClient: true})

promise
  .then(function(db) {
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
  })
  .catch((err) => {
    console.log('MongoDb connection error: ' + err)
  });

export default mongoose
