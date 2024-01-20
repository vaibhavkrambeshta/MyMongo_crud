const mongoose = require('mongoose');
// Allow Promises
mongoose.Promise = global.Promise;
// Connection
mongoose.connect('mongodb://51.20.41.138:27017/employee-db');
// mongoose.connect(process.env.MONGO_URL);
// mongoose.connect('mongodb://mongodb-cluster-ip-serv/employee-db');
// Validation
mongoose.connection
  .once('open', () => console.log('Connected to the database!'))
  .on('error', err => console.log('Error with the database!', err));
