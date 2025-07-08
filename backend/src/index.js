import express from "express";
import globalErrorHandler from "./middleware/errorHandler.js";
import userRoute from './users/userRoutes.js';
import taskRoute from './tasks/taskRoutes.js'
import apiRateLimiting from './middleware/apiRateLimiting.js'
import cors from 'cors';
// import mongoSanitize from "express-mongo-sanitize"

// create app 
const app = express();

app.use(cors({
  origin: '*',
}));


// parse req data 
app.use(express.json());
app.use(apiRateLimiting);
app.use(express.urlencoded({ extended: true }));


app.use('/',(req,res)=>{
  return res.json({
    message:"backend deploy!"
  })
})

// routes
app.use('/api/v1', userRoute);
app.use('/api/v1', taskRoute);

// app.use(mongoSanitize());


// add globalErrorHandler 
app.use(globalErrorHandler);

export default app;