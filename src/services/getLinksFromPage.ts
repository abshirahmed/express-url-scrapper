import { normaliseLink } from '../utils/normaliseLink';
import { fetcher } from '../utils/fetcher';
import { parse } from 'node-html-parser';

export const getLinksFromPage = async (
  url: string,
  baseUrl = url
): Promise<string[]> => {
  const htmlPage = await fetcher(url);
  const htmlElement = parse(htmlPage);
  const links = new Set<string>();

  htmlElement.querySelectorAll('a').forEach(({ rawAttributes }) => {
    const { href } = rawAttributes;
    if (href && href.startsWith(baseUrl)) {
      const link = normaliseLink(href);
      if (link) links.add(link);
    }
  });

  return [...links];
};
