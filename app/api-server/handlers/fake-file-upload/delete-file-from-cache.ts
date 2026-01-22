import type { Context } from 'hono';
import { lruCache } from './lru-cache';

export async function deleteFileFromCache(c: Context) {
  const fileId = decodeURIComponent(c.req.param('fileId'));

  lruCache.delete(`upload_offset_${fileId}`);

  return new Response(null, { status: 204 });
}
