import { http } from 'msw';

const cache = new Map<string, number>();

export const mswHandlers = [
  http.post<{ fileId: string }>(
    '/api/upload/:fileId',
    async ({ request, params }) => {
      try {
        const cacheKey = `upload_offset_${params.fileId}`;

        const reader = request.body?.getReader();

        if (!reader) {
          throw new Error('No body', { cause: { status: 400 } });
        }

        const totalSize = parseInt(
          request.headers.get('x-file-size') || '0',
          10,
        );

        let totalReceived = cache.get(cacheKey) || 0;

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          if (value) {
            totalReceived += value.byteLength;
            cache.set(cacheKey, totalReceived);
          }

          if (totalReceived >= totalSize && totalSize > 0) {
            cache.delete(cacheKey);
          }
        }

        return Response.json(
          { success: true, received: totalReceived },
          { status: 200 },
        );
      } catch (error) {
        if (error instanceof Error) {
          return Response.json(
            { success: false, message: error.message },
            { status: (error.cause as { status?: number }).status || 400 },
          );
        }

        return Response.json(
          { success: false, message: 'Unknown Error' },
          { status: 500 },
        );
      }
    },
  ),

  http.get<{ fileId: string }>('/api/cache/:fileId', ({ params }) => {
    const fileId = decodeURIComponent(params.fileId);

    const offset = cache.get(`upload_offset_${fileId}`) || 0;

    return Response.json({ offset }, { status: 200 });
  }),

  http.delete<{ fileId: string }>('/api/cache/:fileId', ({ params }) => {
    const fileId = decodeURIComponent(params.fileId);

    cache.delete(`upload_offset_${fileId}`);

    return new Response(null, { status: 204 });
  }),
];
