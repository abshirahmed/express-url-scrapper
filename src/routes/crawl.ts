import { Request, Response, Router } from 'express';
import { crawlUrl } from '../controllers/crawlUrl';
import { logger } from '../utils/logger';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { url } = req.body;
  const baseUrl = new URL(url).origin;

  logger.info(`Starting to crawl: ${url}`);
  const crawledUrlsMap = new Map();

  await crawlUrl(url, baseUrl, crawledUrlsMap);

  logger.info(`Finished crawling: ${url}`);

  const totalPagesCrawled = crawledUrlsMap.size;
  const totalLinksFound = new Set([...crawledUrlsMap.values()]).size;

  logger.info(`Total Pages Crawled: ${totalPagesCrawled} pages`);
  logger.info(`Total Links Found: ${totalLinksFound} links`);

  const response = [...crawledUrlsMap].map(([url, links]) => ({
    url,
    links
  }));

  res.json(response);
});

export default router;
