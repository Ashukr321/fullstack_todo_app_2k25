import { config as conf } from "dotenv";

conf();

const config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI
}

const envConfig = Object.freeze(config);
export default envConfig;