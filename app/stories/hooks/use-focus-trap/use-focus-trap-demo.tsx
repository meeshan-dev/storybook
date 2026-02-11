import {
  IconToggleLeftFilled,
  IconToggleRightFilled,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useFocusTrap } from './use-focus-trap';

export function UseFocusTrapDemo() {
  const [isTrapped, setIsTrapped] = useState(false);

  const trapProps = useFocusTrap({ enabled: isTrapped });

  return (
    <section data-demo>
      <Button onClick={() => setIsTrapped(!isTrapped)}>
        {isTrapped ? <IconToggleRightFilled /> : <IconToggleLeftFilled />}
        {isTrapped ? 'Disable Trap' : 'Enable Trap'}
      </Button>

      <p className='mt-2'>
        <Badge>
          State: {isTrapped ? 'Trapped (Tab to cycle inside)' : 'Normal'}
        </Badge>
      </p>

      <p className='text-muted-foreground mt-4 text-sm'>
        Elements outside the trap:
      </p>

      <div className='mt-2 flex items-center gap-2 *:grow'>
        <Input placeholder='Outside 1' />
        <Input placeholder='Outside 2' />
      </div>

      <div
        {...trapProps}
        data-trapped={isTrapped}
        className='my-8 flex flex-col rounded border p-3 transition-colors outline-none data-[trapped=true]:border-blue-600 data-[trapped=true]:focus-visible:ring-[3px] data-[trapped=true]:focus-visible:ring-blue-600/50 dark:data-[trapped=true]:border-blue-400 dark:data-[trapped=true]:focus-visible:ring-blue-400/50'
      >
        <h3 className='text-lg font-semibold'>Focus Trap Zone</h3>

        <p className='text-muted-foreground mt-1 text-sm'>
          When trapped, you cannot tab out of this area with keyboard.
        </p>

        <div className='mt-4 flex gap-2 *:grow'>
          <Input placeholder='Inside 1' />
          <Input placeholder='Inside 2' />
        </div>

        <div className='mt-2 flex gap-2 *:grow'>
          <Input placeholder='Inside 3' />
          <Input placeholder='Inside 4' />
        </div>
      </div>

      <p className='text-muted-foreground text-sm'>
        Elements outside the trap:
      </p>

      <div className='mt-2 flex items-center gap-2 *:grow'>
        <Input placeholder='Outside 1' />
        <Input placeholder='Outside 2' />
      </div>
    </section>
  );
}
