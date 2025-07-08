import mongoose from "mongoose"
import envConfig from './envConfig.js'

const connectDb = async () => {
  try {
    await mongoose.connect(envConfig.mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: envConfig.db_name,
    });
    console.log("Database connected successfully!");
    return true;
  } catch (error) {
    console.error("Failed to connect to database!", error);
    process.exit(1);
  }
}

// export connectDb 
export default connectDb;