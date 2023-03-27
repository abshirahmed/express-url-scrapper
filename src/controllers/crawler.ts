import { logger } from '../utils/logger';
import { extractLinks } from '../services/extractLinks';

export const crawler = async (
  url: string,
  domain: string,
  extractedUrls: Map<string, string[]>
): Promise<Map<string, string[]>> => {
  if (extractedUrls.has(url)) return new Map();

  const links = await extractLinks(url, domain);

  logger.info(`Visiting: ${url}`);
  logger.info(`Found: ${links.length} links`);

  extractedUrls.set(url, links);

  const promises = links.map((link) => crawler(link, domain, extractedUrls));
  await Promise.all(promises);

  return extractedUrls;
};
