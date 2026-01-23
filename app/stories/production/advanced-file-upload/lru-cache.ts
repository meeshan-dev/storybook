import { LRUCache } from 'lru-cache';

export const lruCache = new LRUCache<string, number>({
  max: 1000,
  ttl: 1000 * 60 * 5,
  ttlAutopurge: true,
});
