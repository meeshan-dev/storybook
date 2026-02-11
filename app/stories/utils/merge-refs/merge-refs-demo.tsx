import { useRef, useState } from 'react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { mergeRefs } from './merge-refs';

export function MergeRefsDemo() {
  return (
    <section data-demo className='flex flex-col items-center gap-12'>
      <BasicMerge />
      <CallbackAndObjectRefs />
    </section>
  );
}

/* ——————————————————————————————————————————————————————— */
/*  1. Merging two object refs                            */
/* ——————————————————————————————————————————————————————— */

function BasicMerge() {
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line @eslint-react/naming-convention/use-state
  const [_, setRerender] = useState(true);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setRerender((prev) => !prev); // Force re-render to show updated ref values
  };

  return (
    <div className='w-full'>
      <div className='text-center'>
        <Badge variant='secondary' className='mb-2'>
          Object Refs
        </Badge>
        <h2 className='text-2xl font-bold'>Merging Two Refs</h2>
        <p className='text-muted-foreground mt-1'>
          Both <code className='font-mono text-sm'>input1Ref</code> and{' '}
          <code className='font-mono text-sm'>input2Ref</code> point to the same
          input element
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className='mt-6 flex flex-col items-center gap-4'
      >
        <Input
          ref={mergeRefs(
            input1Ref,
            input2Ref,
            // only to trigger re-render
            () => {
              setRerender((prev) => !prev);
            },
          )}
          type='text'
          placeholder='Type... max 10 characters'
          className='max-w-sm'
          maxLength={10}
        />

        <Button
          variant='secondary'
          onClick={handleSubmit}
          className='w-full max-w-sm'
        >
          Read both refs
        </Button>

        <div className='w-full space-y-2 rounded-lg border p-4 text-sm'>
          <p>
            <span className='font-medium'>input1Ref.current: </span>
            <code className='font-mono text-sm'>
              {/* eslint-disable-next-line react-hooks/refs */}
              {input1Ref.current
                ? // eslint-disable-next-line react-hooks/refs
                  `<${input1Ref.current.tagName.toLowerCase()} value="${input1Ref.current.value}">`
                : '(null)'}
            </code>
          </p>

          <p>
            <span className='font-medium'>input2Ref.current: </span>
            <code className='font-mono text-sm'>
              {/* eslint-disable-next-line react-hooks/refs */}
              {input2Ref.current
                ? // eslint-disable-next-line react-hooks/refs
                  `<${input2Ref.current.tagName.toLowerCase()} value="${input2Ref.current.value}">`
                : '(null)'}
            </code>
          </p>

          {/* eslint-disable-next-line react-hooks/refs */}
          {input1Ref.current &&
            input2Ref.current &&
            // eslint-disable-next-line react-hooks/refs
            input1Ref.current === input2Ref.current && (
              <p>
                Both refs point to the same element, demonstrating that{' '}
                <code className='font-mono text-sm'>mergeRefs</code>{' '}
                successfully merged them together.
              </p>
            )}
        </div>
      </form>
    </div>
  );
}

/* ——————————————————————————————————————————————————————— */
/*  2. Mixing callback refs and object refs               */
/* ——————————————————————————————————————————————————————— */

function CallbackAndObjectRefs() {
  const objectRef = useRef<HTMLDivElement>(null);

  const [callbackElement, setCallbackElement] = useState<HTMLDivElement | null>(
    null,
  );

  const [dimensions, setDimensions] = useState<string>('');

  const handleMeasure = () => {
    if (objectRef.current) {
      const rect = objectRef.current.getBoundingClientRect();
      setDimensions(`${Math.round(rect.width)}w x ${Math.round(rect.height)}h`);
    }
  };

  return (
    <div className='w-full'>
      <div className='text-center'>
        <Badge variant='secondary' className='mb-2'>
          Mixed Ref Types
        </Badge>
        <h2 className='text-2xl font-bold'>Callback + Object Refs</h2>
        <p className='text-muted-foreground mt-1'>
          <code>mergeRefs</code> handles both callback and object refs
          seamlessly
        </p>
      </div>

      <div
        ref={mergeRefs(objectRef, setCallbackElement)}
        className='my-4 w-full rounded-lg border p-6 text-center text-sm text-balance'
      >
        This element has both a callback ref and an object ref
      </div>

      <p className='text-sm'>
        <span className='font-medium'>Callback ref received: </span>
        <code className='font-mono'>
          {callbackElement
            ? `<${callbackElement.tagName.toLowerCase()}>`
            : '(not yet called)'}
        </code>
      </p>

      <p className='mt-2 text-sm'>
        <span className='font-medium'>Object ref: </span>
        <code className='font-mono'>
          {/* eslint-disable-next-line react-hooks/refs */}
          {objectRef.current
            ? // eslint-disable-next-line react-hooks/refs
              `<${objectRef.current.tagName.toLowerCase()}>`
            : '(not yet attached)'}
        </code>
      </p>

      <Button variant='secondary' onClick={handleMeasure} className='mt-2'>
        Measure via object ref
      </Button>

      {dimensions && (
        <p className='mt-2 text-sm'>
          <span className='font-medium'>Dimensions: </span>
          <code>{dimensions}</code>
        </p>
      )}
    </div>
  );
}
