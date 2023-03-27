import { Request, Response, Router } from 'express';
import { crawler } from '../controllers/crawler';
import { logger } from '../utils/logger';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { url } = req.body;

  logger.info(`Starting to crawl: ${url}`);

  const extractedUrls = await crawler(url, url, new Map());

  logger.info(`Finished crawling: ${url}`);

  const totalPagesVisited = extractedUrls.size;
  const totalLinksFound = new Set(Array.from(extractedUrls.values())).size;

  logger.info(`Total Pages Visited: ${totalPagesVisited} pages`);
  logger.info(`Total Links Found: ${totalLinksFound} links`);

  const response = {
    totalPagesVisited,
    totalLinksFound,
    extractedUrls: Object.fromEntries(extractedUrls)
  };

  res.json(response);
});

export default router;
