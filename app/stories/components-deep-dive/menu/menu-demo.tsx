import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '../dialog/dialog';
import {
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupContent,
  MenuGroupLabel,
  MenuItem,
  MenuPortal,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from './menu';

export function MenuDemo() {
  return (
    <div className='flex grow flex-col items-center justify-center gap-4 *:w-full *:max-w-60'>
      <BasicMenu />
      <CheckboxMenu />
      <RadioMenu />
      <GroupMenu />
      <MenuInDialog />
    </div>
  );
}

function BasicMenu() {
  return (
    <MenuRoot>
      <MenuTrigger>
        {(props) => (
          <Button {...props} variant='secondary'>
            Open menu
          </Button>
        )}
      </MenuTrigger>

      <MenuPortal>
        <MenuContent>
          <MenuItem>New file</MenuItem>
          <MenuItem>Open…</MenuItem>
          <MenuSeparator />
          <MenuItem>Save</MenuItem>
          <MenuItem disabled>Export</MenuItem>
        </MenuContent>
      </MenuPortal>
    </MenuRoot>
  );
}

function CheckboxMenu() {
  const [visible, setVisible] = useState({
    grid: true,
    ruler: false,
    guides: true,
  });

  return (
    <MenuRoot>
      <MenuTrigger>
        {(props) => (
          <Button {...props} variant='secondary'>
            View options
          </Button>
        )}
      </MenuTrigger>

      <MenuPortal>
        <MenuContent>
          <MenuCheckboxItem
            checked={visible.grid}
            disableCloseOnChange
            onChange={(v) => setVisible((s) => ({ ...s, grid: v }))}
          >
            <span className='grow'>Show grid</span>
            {visible.grid ? <IconCheck /> : null}
          </MenuCheckboxItem>

          <MenuCheckboxItem
            checked={visible.ruler}
            disableCloseOnChange
            onChange={(v) => setVisible((s) => ({ ...s, ruler: v }))}
          >
            <span className='grow'>Show ruler</span>
            {visible.ruler ? <IconCheck /> : null}
          </MenuCheckboxItem>

          <MenuCheckboxItem
            checked={visible.guides}
            disableCloseOnChange
            onChange={(v) => setVisible((s) => ({ ...s, guides: v }))}
          >
            <span className='grow'>Show guides</span>
            {visible.guides ? <IconCheck /> : null}
          </MenuCheckboxItem>
        </MenuContent>
      </MenuPortal>
    </MenuRoot>
  );
}

function RadioMenu() {
  const [align, setAlign] = useState('left');

  return (
    <MenuRoot>
      <MenuTrigger>
        {(props) => (
          <Button {...props} variant='secondary'>
            Alignment
          </Button>
        )}
      </MenuTrigger>

      <MenuPortal>
        <MenuContent>
          <MenuGroup>
            <MenuGroupContent>
              <MenuRadioGroup value={align} onChange={setAlign}>
                <MenuRadioItem value='left'>
                  <span className='grow'>Left</span>{' '}
                  {align === 'left' ? <IconCheck /> : null}
                </MenuRadioItem>
                <MenuRadioItem value='center'>
                  <span className='grow'>Center</span>{' '}
                  {align === 'center' ? <IconCheck /> : null}
                </MenuRadioItem>
                <MenuRadioItem value='right'>
                  <span className='grow'>Right</span>{' '}
                  {align === 'right' ? <IconCheck /> : null}
                </MenuRadioItem>
              </MenuRadioGroup>
            </MenuGroupContent>
          </MenuGroup>
        </MenuContent>
      </MenuPortal>
    </MenuRoot>
  );
}

function GroupMenu() {
  return (
    <MenuRoot loop>
      <MenuTrigger>
        {(props) => (
          <Button {...props} variant='secondary'>
            Account
          </Button>
        )}
      </MenuTrigger>

      <MenuPortal>
        <MenuContent>
          <MenuGroup>
            <MenuGroupLabel>Profile</MenuGroupLabel>
            <MenuGroupContent>
              <MenuItem>Edit profile</MenuItem>
              <MenuItem>Security</MenuItem>
            </MenuGroupContent>
          </MenuGroup>

          <MenuSeparator />

          <MenuGroup>
            <MenuGroupLabel>Danger zone</MenuGroupLabel>
            <MenuGroupContent>
              <MenuItem>Sign out</MenuItem>
              <MenuItem variant='destructive'>Delete account</MenuItem>
            </MenuGroupContent>
          </MenuGroup>
        </MenuContent>
      </MenuPortal>
    </MenuRoot>
  );
}

function MenuInDialog() {
  return (
    <>
      <DialogRoot>
        <DialogTrigger>
          {(props) => <Button {...props}>Open dialog</Button>}
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay />

          <DialogContent>
            <div className='grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center sm:place-items-start sm:text-left'>
              <DialogTitle>Popover in dialog</DialogTitle>
              <DialogDescription>
                On escape key press or outside click, popover will close first
                then dialog will close on second escape key press.
              </DialogDescription>
            </div>

            <p className='text-muted-foreground text-sm'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos aut
              eaque molestiae dolores dolore libero a perferendis, saepe
            </p>

            <div className='flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto'>
              <DialogClose>
                {(props) => (
                  <Button variant='secondary' {...props}>
                    Close
                  </Button>
                )}
              </DialogClose>

              <BasicMenu />
            </div>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </>
  );
}
