import { extractLinks } from '../../../src/services/extractLinks';
import { server } from '../../mocks/server';

describe('extractLinks', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('should extract links from a page', async () => {
    const url = 'https://example.com';
    const links = await extractLinks(url);
    expect(links).toEqual([
      'https://example.com/about',
      'https://example.com/blogs'
    ]);
  });
});
