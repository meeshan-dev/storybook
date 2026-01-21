import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.post<never, { message: string }, { ok: boolean; message: string }>(
    '/api/message',
    async ({ request }) => {
      const { message } = await request.json();

      const randomDelay = Math.floor(Math.random() * 2000);

      await delay(randomDelay);

      const shouldFail = Math.random() < 0.1;

      if (shouldFail) {
        return HttpResponse.json(
          { ok: false, message: 'Failed to send message' },
          { status: 400 },
        );
      }

      return HttpResponse.json({ ok: true, message }, { status: 200 });
    },
  ),
];
