import app from '../src/index.js';
import connectDb from '../src/config/connectDb.js';
import { createServer } from 'http';

let isDbConnected = false;
const server = createServer(app);

export default async function handler(req, res) {
  if (!isDbConnected) {
    await connectDb();
    isDbConnected = true;
  }
  server.emit('request', req, res);
}
