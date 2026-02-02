import { Label } from '~/components/ui/label';
import { Combobox } from './combobox';

export function ComboboxDemo() {
  return (
    <main className='flex grow flex-col items-center justify-center gap-3'>
      <div className='w-72 space-y-2'>
        <Label>Single Combobox</Label>
        <Combobox
          options={Array.from({ length: 50 }).map((_, i) => ({
            label: `label ${i + 0}`,
            value: i + 0,
          }))}
        />
      </div>

      <div className='mt-5 w-72 space-y-2'>
        <Label>Multiple Combobox</Label>
        <Combobox
          multiple
          options={Array.from({ length: 50 }).map((_, i) => ({
            label: `label ${i + 0}`,
            value: i + 0,
          }))}
        />
      </div>

      <div className='mt-5 w-72 space-y-2'>
        <Label>Disabled Options</Label>
        <Combobox
          multiple
          options={Array.from({ length: 50 }).map((_, i) => ({
            label: `label ${i + 0}`,
            value: i + 0,
          }))}
          getOptionDisabled={(opt) => +opt.value % 2 === 0}
        />
      </div>
    </main>
  );
}
