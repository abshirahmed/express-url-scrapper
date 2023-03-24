import { app } from '../../../src/app';
import supertest from 'supertest';

const request = supertest(app);

describe('GET /', () => {
  it('responds with "Hello World!"', async () => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(response.body).toBe('Hello World!');
  });
});
