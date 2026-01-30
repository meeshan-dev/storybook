import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { FloatingArrow } from '../floating-arrow/floating-arrow';
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

export function MenuPreview() {
  return (
    <div className='flex grow flex-col items-center justify-center gap-4 *:w-full *:max-w-60'>
      <BasicMenu />
      <CheckboxMenu />
      <RadioMenu />
      <GroupMenu />
    </div>
  );
}

export function BasicMenu() {
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
        <MenuContent arrow={(props) => <FloatingArrow {...props} />}>
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

export function CheckboxMenu() {
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
        <MenuContent arrow={(props) => <FloatingArrow {...props} />}>
          <MenuCheckboxItem
            checked={visible.grid}
            disableCloseOnChange
            onChange={(v) => setVisible((s) => ({ ...s, grid: v }))}
          >
            Show grid
          </MenuCheckboxItem>

          <MenuCheckboxItem
            checked={visible.ruler}
            disableCloseOnChange
            onChange={(v) => setVisible((s) => ({ ...s, ruler: v }))}
          >
            Show ruler
          </MenuCheckboxItem>

          <MenuCheckboxItem
            checked={visible.guides}
            disableCloseOnChange
            onChange={(v) => setVisible((s) => ({ ...s, guides: v }))}
          >
            Show guides
          </MenuCheckboxItem>
        </MenuContent>
      </MenuPortal>
    </MenuRoot>
  );
}

export function RadioMenu() {
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
        <MenuContent arrow={(props) => <FloatingArrow {...props} />}>
          <MenuGroup>
            <MenuGroupLabel>Alignment</MenuGroupLabel>
            <MenuGroupContent>
              <MenuRadioGroup value={align} onChange={setAlign}>
                <MenuRadioItem value='left'>Left</MenuRadioItem>
                <MenuRadioItem value='center'>Center</MenuRadioItem>
                <MenuRadioItem value='right'>Right</MenuRadioItem>
              </MenuRadioGroup>
            </MenuGroupContent>
          </MenuGroup>
        </MenuContent>
      </MenuPortal>
    </MenuRoot>
  );
}

export function GroupMenu() {
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
        <MenuContent arrow={(props) => <FloatingArrow {...props} />}>
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
              <MenuItem className='text-red-600'>Delete account</MenuItem>
            </MenuGroupContent>
          </MenuGroup>
        </MenuContent>
      </MenuPortal>
    </MenuRoot>
  );
}
