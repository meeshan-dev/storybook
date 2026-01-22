import type { Context } from 'hono';
import { lruCache } from './lru-cache';

export function getFileCache(c: Context) {
  const fileId = decodeURIComponent(c.req.param('fileId'));

  const offset = lruCache.get(`upload_offset_${fileId}`) || 0;

  return Response.json({ offset }, { status: 200 });
}
