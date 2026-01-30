import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { ToggleButton, ToggleButtonGroup } from './toggle-button';

export function ToggleButtonPreview() {
  return (
    <main className='flex grow flex-col items-center justify-center gap-8 py-10'>
      <section className='flex flex-col gap-3'>
        <p>
          <Badge variant='secondary'>Exclusive</Badge>
        </p>

        <ToggleButtonGroup exclusive defaultValue='bold'>
          <fieldset className='flex'>
            {['bold', 'italic', 'underline'].map((value) => (
              <ToggleButton key={value} value={value}>
                {(props, { isSelected }) => (
                  <Button
                    variant={isSelected ? 'default' : 'secondary'}
                    className='rounded-none border-none first:rounded-l-md last:rounded-r-md'
                    {...props}
                  >
                    <span className='first-letter:uppercase'>{value}</span>
                  </Button>
                )}
              </ToggleButton>
            ))}
          </fieldset>
        </ToggleButtonGroup>
      </section>

      <section className='flex flex-col gap-3'>
        <p>
          <Badge variant='secondary'>Multiple</Badge>
        </p>

        <ToggleButtonGroup defaultValue={['react']}>
          <fieldset className='flex'>
            {['react', 'vue', 'svelte'].map((value) => (
              <ToggleButton key={value} value={value}>
                {(props, { isSelected }) => (
                  <Button
                    variant={isSelected ? 'default' : 'secondary'}
                    className='rounded-none first:rounded-l-md last:rounded-r-md'
                    {...props}
                  >
                    <span className='first-letter:uppercase'>{value}</span>
                  </Button>
                )}
              </ToggleButton>
            ))}
          </fieldset>
        </ToggleButtonGroup>
      </section>
    </main>
  );
}
