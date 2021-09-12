
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/powerful-hamlet-00082', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log('Database connected successfully!'))
.catch(err => console.log(err));

module.exports = mongoose.connection;