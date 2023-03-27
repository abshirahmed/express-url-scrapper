import { load } from 'cheerio';
import { normaliseLink } from '../utils/normaliseLink';
import { fetcher } from '../utils/fetcher';

export const extractLinks = async (
  url: string,
  domain = url
): Promise<string[]> => {
  const page = await fetcher(url);
  const $ = load(page);
  const links = new Set<string>();

  $('a').each((_, element) => {
    const href = $(element).attr('href');
    if (href && href.startsWith(domain)) {
      const link = normaliseLink(href);
      if (link) links.add(link);
    }
  });

  return Array.from(links);
};
