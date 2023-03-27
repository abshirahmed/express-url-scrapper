import { normaliseLink } from '../utils/normaliseLink';
import { fetcher } from '../utils/fetcher';
import { parse } from 'node-html-parser';

export const extractLinks = async (
  url: string,
  domain = url
): Promise<string[]> => {
  const page = await fetcher(url);
  const links = new Set<string>();
  const root = parse(page);

  root.querySelectorAll('a').forEach((element) => {
    const { href } = element.rawAttributes;
    if (href && href.startsWith(domain)) {
      const link = normaliseLink(href);
      if (link) links.add(link);
    }
  });

  return Array.from(links);
};
