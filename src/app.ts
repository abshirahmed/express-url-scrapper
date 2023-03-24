import express from 'express';
import cors from 'cors';
import helloWorld from './routes/helloWorld';

export const app = express();

// middleware
app.use(cors());

// routes
app.use('/', helloWorld);
