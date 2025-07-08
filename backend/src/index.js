import express from "express";
import globalErrorHandler from "./middleware/errorHandler.js";
import userRoute from './users/userRoutes.js';
import taskRoute from './tasks/taskRoutes.js'
// create app 
const app = express();

// parse req data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes
app.use('/api/v1', userRoute);
app.use('/api/v1', taskRoute);


// add globalErrorHandler 
app.use(globalErrorHandler);

export default app;