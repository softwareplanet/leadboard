import mongoose from "mongoose";

const MONGODB_URL = 'mongodb://localhost/leadster' + (process.env.NODE_ENV === 'test'? '-test': '');
console.log('Using: ' + MONGODB_URL);

export const connectToMongoose = () =>{
  mongoose.Promise = Promise;
  const promise = mongoose.connect(MONGODB_URL, {useMongoClient: true});

  promise
    .then(function(db) {
      db.on('error', console.error.bind(console, 'MongoDB connection error:'))
    })
    .catch((err) => {
      console.log('MongoDb connection error: ' + err)
    });
};
