const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Safety net for uncaught exception
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! SHUTTING DOWN');
  console.log(err.name, err.message);
  process.exit(0);
});

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE_CLOUD_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Db is connected successfully.`);
  })
  .catch((err) => {
    console.log("Couldn't Connect", err.message);
  });

const app = require('./app');

const PORT = process.env.PORT || 3000;

// Default Environment Variable  set to dev

// console.log(app.get('env'));
// console.log(process.env);

const server = app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});

// Safety Net for unhandled promise rejection

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! SHUTTING DOWN');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(0);
  });
});
