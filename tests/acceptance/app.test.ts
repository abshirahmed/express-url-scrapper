import { app } from '../../src/app';
import supertest from 'supertest';
import { server } from '../mocks/server';
import { logger } from '../../src/utils/logger';

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

  it('should return a 200 response', async () => {
    const expectedResponse = [
      {
        url: 'https://example.com',
        links: ['https://example.com/about', 'https://example.com/blogs']
      },
      {
        url: 'https://example.com/about',
        links: ['https://example.com', 'https://example.com/blogs']
      },
      {
        url: 'https://example.com/blogs',
        links: [
          'https://example.com',
          'https://example.com/about',
          'https://example.com/blogs/1',
          'https://example.com/blogs/2'
        ]
      },
      {
        url: 'https://example.com/blogs/1',
        links: [
          'https://example.com',
          'https://example.com/about',
          'https://example.com/blogs'
        ]
      },
      {
        url: 'https://example.com/blogs/2',
        links: []
      }
    ];

    const actualResponse = await request.post('/crawl').send({
      url: 'https://example.com'
    });

    expect(actualResponse.status).toEqual(200);
    expect(actualResponse.body).toEqual(expectedResponse);
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('should log an error if the url is invalid', async () => {
    const expectedResponse = [
      {
        url: 'https://example.com/blogs/3',
        links: []
      }
    ];

    const actualResponse = await request.post('/crawl').send({
      url: 'https://example.com/blogs/3',
      links: []
    });

    expect(actualResponse.body).toEqual(expectedResponse);
    expect(logger.error).toHaveBeenCalled();
  });
});
