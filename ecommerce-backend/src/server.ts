// server.ts
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import product from './routes/product';
import bodyParser from 'body-parser';
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;
const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL ?? '';

const corsOptions = {
  origin: ['http://localhost:3000']
}

app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: '30mb'}))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

// API routes
app.use('/api/products', product);
app.get('/', (req:Request, res:Response) => {
  res.send('APP IS RUNNING OK')
})

mongoose.set("strictQuery", false);
mongoose.connect(DB_CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
