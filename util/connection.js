const mongoose = require('mongoose');

let dbconnection = null;

mongoose.initDB = function (config) {
// Build the connection string
//var dbURI = "mongodb://" + config.database.host + "/" + config.database.database;
let dbURI = 'mongodb://' + config.database.user+':'+config.database.password+'@'
                +config.database.host +':'+config.database.port+ '/' + config.database.database;
dbconnection = mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    if (!dbconnection) {
        dbconnection = mongoose.createConnection(dbURI);
    }
    console.log('Database -> Pool created for MongoDB host: ' + config.database.host);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Database -> connection error: ' + err);
  dbconnection = null;
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  mongoose.connection.close();
  console.log('Database -> connection disconnected');
  dbconnection = null;
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Database -> Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
};

mongoose.getDbConnection = function () {
return dbconnection;
};

// exports section
module.exports = mongoose;
