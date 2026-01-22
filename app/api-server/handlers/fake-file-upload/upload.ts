import type { Context } from 'hono';
import { lruCache } from './lru-cache';

export async function fakeFileUpload(c: Context) {
  const fileId = c.req.param('fileId');
  const cacheKey = `upload_offset_${fileId}`;

  if (Math.random() < 0.2) {
    return c.text('Simulated network failure', 500);
  }

  const reader = c.req.raw.body?.getReader();

  if (!reader) {
    return c.text('No body', 400);
  }

  const totalSize = parseInt(c.req.header('x-file-size') || '0', 10);

  let totalReceived = (lruCache.get(cacheKey) as number) || 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      if (value) {
        totalReceived += value.byteLength;
        lruCache.set(cacheKey, totalReceived);
      }
    }

    if (totalReceived >= totalSize && totalSize > 0) {
      lruCache.delete(cacheKey);
    }

    return c.json({ received: totalReceived, success: true }, 200);
  } catch {
    return c.json(
      {
        success: false,
        error: 'stream-interrupted',
        message: 'Stream Interrupted',
      },
      500,
    );
  }
}
