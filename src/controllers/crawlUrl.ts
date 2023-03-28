import { logger } from '../utils/logger';
import { getLinksFromPage } from '../services/getLinksFromPage';

export const crawlUrl = async (
  url: string,
  baseUrl: string,
  crawledUrlsMap = new Map()
): Promise<Map<string, string[]>> => {
  if (crawledUrlsMap.has(url)) return new Map();

  logger.info(`Visiting: ${url}`);

  const links = await getLinksFromPage(url, baseUrl);

  logger.info(`Found: ${links.length} links`);

  crawledUrlsMap.set(url, links);

  const promises = links.map((link) => crawlUrl(link, baseUrl, crawledUrlsMap));
  await Promise.all(promises);

  return crawledUrlsMap;
};
