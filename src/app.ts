import express from 'express';
import cors from 'cors';
import crawl from './routes/crawl';
import { json } from 'body-parser';

export const app = express();

// middleware
app.use(cors());
app.use(json());

// routes
app.use('/crawl', crawl);
