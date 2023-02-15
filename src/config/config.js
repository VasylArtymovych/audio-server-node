require('dotenv').config();

const MONGO_URL = process.env.MONGO_URI || '';
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

module.exports = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};
