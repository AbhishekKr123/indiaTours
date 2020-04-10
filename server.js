const mongoose = require('mongoose');
const dotenv = require('dotenv');

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

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
