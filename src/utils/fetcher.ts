import axios from 'axios';
import { logger } from './logger';

export const fetcher = async (url: string) => {
  try {
    const { data } = await axios.get(url, {
      timeout: 5000
    });
    return data;
  } catch (error) {
    logger.error(error, `Failed to fetch "${url}"`);
    return '';
  }
};
