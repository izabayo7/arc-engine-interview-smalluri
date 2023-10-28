import {createClient} from 'redis';
import { promisify } from 'util';
import logger from './logger';
import { redisUrl } from '../environment';

const client = createClient({ url: `redis://${redisUrl}` });

client.on('error', (error) => {
  logger.error(`Redis error: ${error}`);
});

client.on('connect', () => {  
  console.log('Redis client connected');
})

export { client };
