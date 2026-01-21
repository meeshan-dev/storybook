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

type FileItem = {
  id: string;
  key: string;
  file: File;
  progress: number;
  status:
    | 'uploaded'
    | 'uploading'
    | 'processing'
    | 'error'
    | 'paused'
    | 'canceled';
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
  const uploadsInProgress = useRef<Set<string>>(new Set()).current;
  const abortControllers = useRef(new Map<string, AbortController>()).current;

  const [files, setFiles] = useState<FileItem[]>([]);

  const throttledUpdate = useMemo(
    () =>
      throttle((id: string, progress: number) => {
        setFiles((prev) =>
          prev.map((item) =>
            item.id === id && item.status === 'uploading'
              ? { ...item, progress }
              : item,
          ),
        );
      }, 200),
    [],
  );

  const handlePause = (id: string) => {
    const controller = abortControllers.get(id);

    if (controller) {
      controller.abort();

      setFiles((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: 'paused' } : item,
        ),
      );
    }
  };

  const handleResume = (fileItem: FileItem) => {
    setFiles((prev) =>
      prev.map((item) =>
        item.id === fileItem.id ? { ...item, status: 'uploading' } : item,
      ),
    );

    handleUpload(fileItem);
  };

  const handleRetry = (fileItem: FileItem) => {
    setFiles((prev) =>
      prev.map((item) =>
        item.id === fileItem.id ? { ...item, status: 'uploading' } : item,
      ),
    );

    handleUpload(fileItem);
  };

  const handleCancel = (fileItem: FileItem) => {
    const controller = abortControllers.get(fileItem.id);

    if (controller) {
      controller.abort();

      setFiles((prev) =>
        prev.map((item) =>
          item.id === fileItem.id ? { ...item, status: 'canceled' } : item,
        ),
      );

      fetch(genUrl(fileItem.id, 'delete'), {
        method: 'DELETE',
      }).catch();
    }
  };

  const handleUpload = async ({ id, file }: FileItem) => {
    try {
      if (uploadsInProgress.has(id)) return;

      uploadsInProgress.add(id);

      const controller = new AbortController();
      abortControllers.set(id, controller);

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
          setFiles((prev) =>
            prev.map((item) =>
              item.status === 'uploading' && item.id === id
                ? { ...item, status: 'processing' }
                : item,
            ),
          );
        }

        throttledUpdate(id, progress);
      });

      xml.addEventListener('load', () => {
        if (xml.status >= 200 && xml.status < 300) {
          throttledUpdate.cancel();

          setFiles((prev) =>
            prev.map((item) =>
              item.id === id
                ? { ...item, progress: 100, status: 'uploaded' }
                : item,
            ),
          );
        } else {
          setFiles((prev) =>
            prev.map((item) =>
              item.id === id ? { ...item, status: 'error' } : item,
            ),
          );
        }
      });

      xml.addEventListener('error', () => {
        setFiles((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: 'error' } : item,
          ),
        );
      });

      xml.open('POST', genUrl(id, 'upload'));

      xml.setRequestHeader('x-file-size', String(file.size));
      xml.setRequestHeader('x-file-type', file.type);
      xml.setRequestHeader('x-file-name', encodeURIComponent(file.name));
      xml.setRequestHeader('x-file-offset', String(offset));

      xml.send(fileToUpload);
    } catch (error) {
      if ((error as Error).name === 'AbortError') return;

      setFiles((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: 'error' } : item,
        ),
      );
    } finally {
      abortControllers.delete(id);
      uploadsInProgress.delete(id);
    }
  };

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

      for (const file of filesArray) {
        handleUpload(file);
      }
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

  useEffect(() => {
    return () => {
      abortControllers.forEach((controller) => controller.abort());
    };
  }, []);

  return (
    <main>
      <section className='bg-foreground/5 mx-auto flex h-[calc(100dvh-32px)] w-full max-w-lg flex-col rounded-lg'>
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
                <article
                  key={fileItem.key}
                  className='bg-foreground/5 border-foreground/4 grid grid-cols-[auto_1fr] gap-2 rounded-lg border p-3'
                >
                  <div className='row-span-3 pt-2 *:[svg]:size-5'>
                    {getIconForFileType(fileItem.file.type)}
                  </div>

                  <h2
                    id={`${fileItem.file.name}-label`}
                    className='text-foreground/60 truncate text-sm'
                  >
                    {fileItem.file.name}
                  </h2>

                  <div
                    role='progressbar'
                    aria-valuenow={fileItem.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuetext={`${fileItem.progress}% uploaded`}
                    data-status={fileItem.status}
                    className='bg-foreground/10 h-1.5 grow rounded-full data-[status="error"]:bg-red-500/50'
                    aria-labelledby={`${fileItem.file.name}-label`}
                  >
                    <div
                      style={{ width: `${fileItem.progress}%` }}
                      className='h-full rounded-full bg-emerald-500'
                    />
                  </div>

                  <div className='flex min-h-6 items-center gap-2'>
                    <span className='flex items-center justify-center gap-1 text-xs font-medium'>
                      {fileItem.progress} <IconPercentage size={16} />
                    </span>

                    <div className='grow'></div>

                    {(() => {
                      if (fileItem.status === 'error') {
                        return (
                          <Button
                            size='icon-xs'
                            variant='outline'
                            onClick={() => handleRetry(fileItem)}
                          >
                            <IconRefresh />
                          </Button>
                        );
                      }

                      if (fileItem.status === 'paused') {
                        return (
                          <>
                            <Button
                              size='icon-xs'
                              variant='outline'
                              onClick={() => handleResume(fileItem)}
                            >
                              <IconPlayerPlayFilled />
                            </Button>

                            <Button
                              size='xs'
                              variant='outline'
                              onClick={() => handleCancel(fileItem)}
                            >
                              Cancel
                            </Button>
                          </>
                        );
                      }

                      if (fileItem.status === 'processing') {
                        return (
                          <span className='text-xs font-medium text-sky-400'>
                            Processing
                          </span>
                        );
                      }

                      if (fileItem.status === 'canceled') {
                        return (
                          <span className='text-foreground-400 text-xs font-medium'>
                            Canceled
                          </span>
                        );
                      }

                      if (fileItem.status === 'uploaded') {
                        return (
                          <span className='text-xs font-medium text-emerald-400'>
                            Uploaded
                          </span>
                        );
                      }

                      // Uploading

                      return (
                        <>
                          <Button
                            size='icon-xs'
                            variant='outline'
                            onClick={() => handlePause(fileItem.id)}
                          >
                            <IconPlayerPauseFilled />
                          </Button>

                          <Button
                            size='xs'
                            variant='outline'
                            onClick={() => handleCancel(fileItem)}
                          >
                            Cancel
                          </Button>
                        </>
                      );
                    })()}
                  </div>
                </article>
              ))}
            </div>

            <div className='flex items-center gap-2 p-5'>
              <Button
                variant='outline'
                onClick={() => {
                  setFiles((prev) =>
                    prev.filter(
                      (file) =>
                        file.status !== 'uploaded' &&
                        file.status !== 'canceled',
                    ),
                  );

                  if (inputRef.current) inputRef.current.value = '';
                }}
              >
                Clear
              </Button>

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
