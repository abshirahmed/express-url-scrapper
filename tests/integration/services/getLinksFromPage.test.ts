import { getLinksFromPage } from '../../../src/services/getLinksFromPage';
import { server } from '../../mocks/server';

describe('getLinksFromPage', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('should get links from a page', async () => {
    const url = 'https://example.com';
    const links = await getLinksFromPage(url);
    expect(links).toEqual([
      'https://example.com/about',
      'https://example.com/blogs'
    ]);
  });
});
