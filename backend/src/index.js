import express from "express";
import globalErrorHandler from "./middleware/errorHandler.js";
import userRoute from './users/userRoutes.js';
import taskRoute from './tasks/taskRoutes.js'
import apiRateLimiting from './middleware/apiRateLimiting'
import cors from 'cors';
import mongoSanitize from "express-mongo-sanitize"


// create app 
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(mongoSanitize());

// parse req data 
app.use(express.json());
app.use(apiRateLimiting);
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1', userRoute);
app.use('/api/v1', taskRoute);



// add globalErrorHandler 
app.use(globalErrorHandler);

export default app;