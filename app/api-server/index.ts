import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { deleteFileFromCache } from './handlers/fake-file-upload/delete-file-from-cache';
import { getFileCache } from './handlers/fake-file-upload/get-file-cache';
import { fakeFileUpload } from './handlers/fake-file-upload/upload';

const app = new Hono();

if (process.env.NODE_ENV === 'development') {
  app.use('*', async (c, next) => {
    console.log(`--> Request: ${c.req.method} ${c.req.url}`);
    await next();
    console.log(`<-- Response: ${c.res.status}`);
  });

  // since in production, the frontend and backend are served from the same origin,
  // i only need CORS in development mode
  app.use(
    cors({
      origin: ['http://localhost:6006', 'http://localhost:3100'],
      allowMethods: ['*'],
    }),
  );
}

const fakeFileUploadRoute = new Hono();
fakeFileUploadRoute.post('/:fileId', fakeFileUpload);
fakeFileUploadRoute.get('/:fileId', getFileCache);
fakeFileUploadRoute.delete('/:fileId', deleteFileFromCache);

app.route('/api/fake-file-upload', fakeFileUploadRoute);

const server = serve(
  {
    fetch: app.fetch,
    port: 8787,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

// graceful shutdown
process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
