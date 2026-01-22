import { createId } from '@paralleldrive/cuid2';
import {
  IconFile,
  IconFiles,
  IconFileText,
  IconFileTypeZip,
  IconPdf,
  IconPercentage,
  IconPhoto,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconRefresh,
  IconVideo,
} from '@tabler/icons-react';
import throttle from 'lodash.throttle';
import React, {
  startTransition,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button } from '~/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '~/components/ui/empty';
import { SITE_URL } from '~/constants';
import { ScopeProvider, useScopeCtx } from '~/lib/scope-provider';

type Status =
  | 'preparing'
  | 'uploaded'
  | 'uploading'
  | 'processing'
  | 'error'
  | 'paused'
  | 'canceled';

type FileItem = {
  id: string;
  key: string;
  file: File;
};

const genUrl = (id: string, action: 'upload' | 'delete' | 'status') => {
  return new URL(
    `/api/fake-file-upload/${id}?action=${action}`,
    import.meta.env.PROD ? SITE_URL : 'http://localhost:5173',
  );
};

export function AdvancedFileUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const allowScrollToBottomRef = useRef(false);

  const [files, setFiles] = useState<FileItem[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (!selectedFiles?.length) return;

    const filesArray = Array.from(selectedFiles).map((file) => ({
      id: encodeURIComponent(
        `${file.name}-${file.size}-${file.type}-${file.lastModified}`,
      ),
      key: createId(),
      file,
      progress: 0,
      status: 'uploading' as const,
    }));

    startTransition(() => {
      allowScrollToBottomRef.current = true;

      setFiles((prev) => {
        const existingIds = new Set(prev.map((f) => f.id));
        const uniqueNewFiles = filesArray.filter((f) => !existingIds.has(f.id));
        return [...prev, ...uniqueNewFiles];
      });
    });
  };

  useEffect(() => {
    if (!allowScrollToBottomRef.current) return;

    allowScrollToBottomRef.current = false;

    contentRef.current?.scrollTo({
      behavior: 'smooth',
      top: contentRef.current.scrollHeight,
    });
  }, [files]);

  return (
    <main className='h-dvh p-5'>
      <section className='bg-secondary mx-auto flex h-full w-full max-w-lg flex-col rounded-lg'>
        <h1 className='px-5 pt-5 text-sm font-semibold'>
          File Upload with Progress
        </h1>

        {files.length > 0 && (
          <>
            <div
              ref={contentRef}
              className='scrollbar-thin mt-5 grow space-y-3 overflow-auto px-5 py-2'
            >
              {files.map((fileItem) => (
                <FileItem key={fileItem.key} fileItem={fileItem} />
              ))}
            </div>

            <div className='flex items-center gap-2 p-5'>
              <Button
                className='grow'
                onClick={() => {
                  inputRef.current?.click();
                }}
              >
                Pick Files from Device
              </Button>
            </div>
          </>
        )}

        {files.length === 0 && (
          <div className='flex grow flex-col items-center justify-center gap-4 px-5'>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant='icon'>
                  <IconFiles />
                </EmptyMedia>

                <EmptyTitle>Nothing to Upload</EmptyTitle>
                <EmptyDescription>
                  You can upload multiple files at once.
                </EmptyDescription>
              </EmptyHeader>

              <EmptyContent>
                <Button
                  onClick={() => {
                    inputRef.current?.click();
                  }}
                >
                  Pick Files from Device
                </Button>
              </EmptyContent>
            </Empty>
          </div>
        )}
      </section>

      <input
        ref={inputRef}
        type='file'
        multiple
        className='sr-only'
        tabIndex={-1}
        onChange={handleInputChange}
      />
    </main>
  );
}

function getIconForFileType(fileType: string) {
  switch (fileType) {
    case 'text/plain':
      return <IconFileText />;

    case 'image/jpeg':
    case 'image/png':
      return <IconPhoto />;

    case 'application/pdf':
      return <IconPdf />;

    case 'video/webm':
    case 'video/mp4':
      return <IconVideo />;

    case 'application/zip':
      return <IconFileTypeZip />;

    default:
      return <IconFile />;
  }
}

function FileItem({ fileItem }: { fileItem: FileItem }) {
  const { id, file } = fileItem;

  const abortControllerRef = useRef<AbortController | null>(null);
  const progressRef = useRef<ProgressRef>(null);

  const [status, setStatus] = useState<Status>('preparing');

  useEffect(() => {
    if (status === 'preparing') {
      setStatus('uploading');
      handleUpload(fileItem);
    }
  }, [status]);

  useEffect(() => {
    if (!abortControllerRef.current) return;

    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const throttledUpdate = useMemo(
    () =>
      throttle((progress: number) => {
        if (!progressRef.current) throw new Error('Progress ref is null');

        progressRef.current.setProgress(progress);
      }, 200),
    [],
  );

  const handleUpload = async ({ id, file }: FileItem) => {
    try {
      if (status === 'uploading') return;

      const controller = new AbortController();
      abortControllerRef.current = controller;

      let offset = 0;

      try {
        const statusRes = await fetch(genUrl(id, 'upload'));

        if (!statusRes.ok) throw new Error('Failed to get upload status');

        const result = await statusRes.json();

        offset = result.offset;
      } catch {
        offset = 0;
      }

      const fileToUpload = offset > 0 ? file.slice(offset) : file;

      const xml = new XMLHttpRequest();

      controller.signal.addEventListener('abort', () => {
        xml.abort();
      });

      xml.upload.addEventListener('progress', (e) => {
        if (!e.lengthComputable)
          throw new Error('Cannot compute upload progress');

        const uploaded = offset + e.loaded;
        const progress = Math.round((uploaded / file.size) * 100);

        if (e.loaded === e.total) {
          throttledUpdate.cancel();
          setStatus('processing');
        } else {
          throttledUpdate(progress);
        }
      });

      xml.addEventListener('load', () => {
        throttledUpdate.cancel();

        if (xml.status >= 200 && xml.status < 300) {
          if (!progressRef.current) throw new Error('Progress ref is null');

          progressRef.current.setProgress(100);
          setStatus('uploaded');
        } else {
          setStatus('error');
        }
      });

      xml.addEventListener('error', () => {
        throttledUpdate.cancel();
        setStatus('error');
      });

      xml.open('POST', genUrl(id, 'upload'));

      xml.setRequestHeader('x-file-size', String(file.size));
      xml.setRequestHeader('x-file-type', file.type);
      xml.setRequestHeader('x-file-name', encodeURIComponent(file.name));
      xml.setRequestHeader('x-file-offset', String(offset));

      xml.send(fileToUpload);
    } catch (error) {
      throttledUpdate.cancel();

      if ((error as Error).name === 'AbortError') return;

      setStatus('error');
    }
  };

  const handlePause = () => {
    if (!abortControllerRef.current) return;

    throttledUpdate.cancel();
    abortControllerRef.current.abort();
    setStatus('paused');
  };

  const handleRetry = () => {
    setStatus('uploading');
    handleUpload(fileItem);
  };

  const handleCancel = () => {
    if (!abortControllerRef.current) return;

    throttledUpdate.cancel();
    abortControllerRef.current.abort();
    setStatus('canceled');

    fetch(genUrl(fileItem.id, 'delete'), {
      method: 'DELETE',
    }).catch();
  };

  return (
    <ProgressProvider ref={progressRef}>
      <article className='bg-background grid grid-cols-[auto_1fr] gap-2 rounded-lg p-3'>
        <div className='row-span-3 pt-2 *:[svg]:size-5'>
          {getIconForFileType(file.type)}
        </div>

        <h2 id={id} className='text-muted-foreground truncate text-sm'>
          {file.name}
        </h2>

        <ProgressBar status={status} labelledby={id} />

        <div className='flex min-h-6 items-center gap-2'>
          <ProgressPercentage />

          <div className='grow'></div>

          {(() => {
            if (status === 'error') {
              return (
                <Button size='icon-xs' variant='outline' onClick={handleRetry}>
                  <IconRefresh />
                </Button>
              );
            }

            if (status === 'paused') {
              return (
                <>
                  <Button
                    size='icon-xs'
                    variant='outline'
                    onClick={handleRetry}
                  >
                    <IconPlayerPlayFilled />
                  </Button>

                  <Button size='xs' variant='outline' onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              );
            }

            if (status === 'processing') {
              return (
                <span className='text-xs font-medium text-sky-600 dark:text-sky-400'>
                  Processing
                </span>
              );
            }

            if (status === 'canceled') {
              return <span className='text-xs font-medium'>Canceled</span>;
            }

            if (status === 'preparing') {
              return <span className='text-xs font-medium'>Preparing</span>;
            }

            if (status === 'uploaded') {
              return (
                <span className='text-xs font-medium text-emerald-600 dark:text-emerald-400'>
                  Uploaded
                </span>
              );
            }

            // Uploading

            return (
              <>
                <Button size='icon-xs' variant='outline' onClick={handlePause}>
                  <IconPlayerPauseFilled />
                </Button>

                <Button size='xs' variant='outline' onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            );
          })()}
        </div>
      </article>
    </ProgressProvider>
  );
}

type ProgressRef = {
  setProgress: (value: number) => void;
};

function ProgressProvider({
  ref,
  children,
}: {
  ref: React.Ref<ProgressRef>;
  children: React.ReactNode;
}) {
  const [progress, setProgress] = useState(0);

  useImperativeHandle(ref, () => ({ setProgress }), []);

  return <ScopeProvider value={{ progress }}>{children}</ScopeProvider>;
}

function ProgressBar({
  status,
  labelledby,
}: {
  status: Status;
  labelledby: string;
}) {
  const { progress } = useScopeCtx<{ progress: number }>();

  return (
    <div
      role='progressbar'
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${progress}% uploaded`}
      data-status={status}
      className='dark:bg-foreground/10 bg-foreground/15 h-1.5 grow rounded-full data-[status="error"]:bg-red-500/70 dark:data-[status="error"]:bg-red-500/70'
      aria-labelledby={labelledby}
    >
      <div
        style={{ width: `${progress}%` }}
        className='h-full rounded-full bg-emerald-500'
      />
    </div>
  );
}

function ProgressPercentage() {
  const { progress } = useScopeCtx<{ progress: number }>();

  return (
    <span className='flex items-center justify-center gap-1 text-xs font-medium'>
      {progress} <IconPercentage size={16} />
    </span>
  );
}
