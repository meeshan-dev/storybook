import { createId } from '@paralleldrive/cuid2';
import {
  IconArrowRight,
  IconCheck,
  IconChecks,
  IconInfoCircle,
} from '@tabler/icons-react';
import React, { startTransition } from 'react';
import { Badge } from '~/components/ui/badge';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '~/components/ui/input-group';
import { ScrollArea } from '~/components/ui/scroll-area';

/**
 * ⚠️ WARNING: Experimental Code!
 * This implementation is for experimenting with optimistic UI patterns.
 * Not intended for production use.
 */

type Message = {
  id: string;
  text: string;
  status: 'sending' | 'sent' | 'error';
};

export function OptimisticChat() {
  const chatInputRef = React.useRef<{ reset: () => void }>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const shouldScrollToBottomRef = React.useRef(false);

  const [messages, setMessages] = React.useState<Message[]>([]);

  const sendMessage = async (message: Message, isRetry?: boolean) => {
    if (isRetry) {
      console.log('Retrying message:', message);

      setMessages((msgs) =>
        msgs.map((msg) =>
          msg.id === message.id ? { ...msg, status: 'sending' } : msg,
        ),
      );
    }

    const res = await fetch('/api/message', {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      setMessages((msgs) =>
        msgs.map((msg) =>
          msg.id === message.id ? { ...msg, status: 'error' } : msg,
        ),
      );
      return;
    }

    setMessages((msgs) =>
      msgs.map((msg) =>
        msg.id === message.id ? { ...msg, status: 'sent' } : msg,
      ),
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const message = formData.get('message')?.toString();

    if (!message) return;

    chatInputRef.current?.reset();
    e.currentTarget.reset();

    const newMessage: Message = {
      id: createId(),
      text: message,
      status: 'sending',
    };

    shouldScrollToBottomRef.current = true;

    setMessages((msgs) => [...msgs, newMessage]);

    startTransition(async () => {
      await sendMessage(newMessage);
    });
  };

  React.useEffect(() => {
    if (!shouldScrollToBottomRef.current) return;

    shouldScrollToBottomRef.current = false;

    viewportRef.current?.scrollTo({
      top: viewportRef.current.scrollHeight + 24 + 8,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <main className='h-dvh p-5'>
      <section className='bg-secondary mx-auto flex h-full w-[min(100%,375px)] flex-col rounded-lg'>
        <header className='border-foreground/20 flex items-center gap-2 border-b px-4 py-2.5'>
          <div
            className='bg-foreground/10 size-7 rounded-full'
            aria-hidden='true'
          />
          <h1 className='text-secondary-foreground text-sm'>Optimistic Chat</h1>
        </header>

        <form
          id='chat-form'
          className='flex grow overflow-auto'
          onSubmit={handleSubmit}
        >
          <ScrollArea
            viewportRef={viewportRef}
            className='grow'
            scrollbarClassName='data-vertical:w-1.5'
            thumbClassName='bg-foreground/20'
          >
            <ul className='flex grow flex-col items-end gap-2 p-2'>
              {messages.map((msg) => (
                <Message
                  key={msg.id}
                  msg={msg}
                  onRetry={() => {
                    startTransition(async () => {
                      sendMessage(msg, true);
                    });
                  }}
                />
              ))}
            </ul>
          </ScrollArea>
        </form>

        <footer className='p-2 pb-2'>
          <ChatInput ref={chatInputRef} />
        </footer>
      </section>
    </main>
  );
}

function ChatInput({ ref }: { ref: React.Ref<{ reset: () => void }> }) {
  const [value, setValue] = React.useState('');

  React.useImperativeHandle(ref, () => ({
    reset: () => setValue(''),
  }));

  return (
    <InputGroup className='border-foreground/20 rounded-full has-[[data-slot=input-group-control]:focus-visible]:ring-0'>
      <InputGroupInput
        placeholder='Type...'
        className='text-sm placeholder:text-sm placeholder:italic'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete='off'
        form='chat-form'
        name='message'
      />

      <InputGroupAddon align='inline-end'>
        <InputGroupButton
          size='icon-xs'
          type='submit'
          disabled={!value}
          form='chat-form'
        >
          <IconArrowRight />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}

function Message({ msg, onRetry }: { msg: Message; onRetry: () => void }) {
  return (
    <li key={msg.id} className='flex w-full items-center justify-end gap-2'>
      {msg.status === 'error' && (
        <Badge
          variant='secondary'
          className='dark:bg-foreground/5 bg-foreground/8'
          render={
            <button type='button' className='outline-none' onClick={onRetry}>
              Retry
            </button>
          }
        />
      )}

      <div className='dark:bg-foreground/5 bg-foreground/8 flex max-w-[80%] flex-wrap items-center justify-end gap-y-0.5 rounded-md px-2 py-1 text-xs wrap-break-word'>
        <p className='grow'>{msg.text}</p>

        <div className='flex h-4 items-center'>
          {msg.status === 'sent' && (
            <IconChecks className='ml-1 size-3.5 text-sky-600 dark:text-sky-400' />
          )}

          {msg.status === 'sending' && (
            <IconCheck className='text-foreground/60 ml-1 size-3.5' />
          )}

          {msg.status === 'error' && (
            <IconInfoCircle className='ml-1 size-3.5 text-red-600 dark:text-red-400' />
          )}
        </div>
      </div>
    </li>
  );
}
