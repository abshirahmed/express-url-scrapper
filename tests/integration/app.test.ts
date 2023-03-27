import { app } from '../../src/app';
import supertest from 'supertest';
import { server } from '../mocks/server';

jest.mock('../../src/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn()
  }
}));

const request = supertest(app);
describe('POST /crawl', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
  afterAll(() => server.close());

  it('should return 200 with a response body', async () => {
    const expectedResponse = {
      totalPagesVisited: 5,
      totalLinksFound: 5,
      extractedUrls: {
        'https://fake-static-site.com': [
          'https://fake-static-site.com/about',
          'https://fake-static-site.com/blogs'
        ],
        'https://fake-static-site.com/about': [
          'https://fake-static-site.com',
          'https://fake-static-site.com/blogs'
        ],
        'https://fake-static-site.com/blogs': [
          'https://fake-static-site.com',
          'https://fake-static-site.com/about',
          'https://fake-static-site.com/blogs/1',
          'https://fake-static-site.com/blogs/2'
        ],
        'https://fake-static-site.com/blogs/1': [
          'https://fake-static-site.com',
          'https://fake-static-site.com/about',
          'https://fake-static-site.com/blogs'
        ],
        'https://fake-static-site.com/blogs/2': []
      }
    };

    const actualResponse = await request.post('/crawl').send({
      url: 'https://fake-static-site.com'
    });

    expect(actualResponse.status).toEqual(200);
    expect(actualResponse.body).toEqual(expectedResponse);
  });
});
