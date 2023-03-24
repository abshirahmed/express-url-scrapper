import { Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

router.get('/', (request: Request, response: Response) => {
  response.json('Hello World!');
});

export default router;
