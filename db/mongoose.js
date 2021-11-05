// Connection to MongoDB, define your MONGO_URI in ../config/dev.env

const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

mongoose.connect(`${uri}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
