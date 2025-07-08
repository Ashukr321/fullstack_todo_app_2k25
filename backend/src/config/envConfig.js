import { config as conf } from "dotenv";

conf();

const config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  db_name :process.env.DB_NAME,
  jwt_secret :process.env.JWT_SECRET
}

const envConfig = Object.freeze(config);
export default envConfig;