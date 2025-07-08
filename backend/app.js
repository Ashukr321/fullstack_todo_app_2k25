import app from "./src/index.js";
import envConfig from "./src/config/envConfig.js";
import connectDb from "./src/config/connectDb.js";

// run server 
const startServer = async () => {

  try {
    // database connection
   await connectDb();
    app.listen(envConfig.port, () => {
      console.log(`server listen on port : ${envConfig.port}`)
    })
  } catch (error) {
    console.log(`can't run server ${error.message}`)
  }

}

startServer();

