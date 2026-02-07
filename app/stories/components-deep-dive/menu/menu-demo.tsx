import {
  IconArrowUp,
  IconCheck,
  IconClipboard,
  IconCommand,
  IconCopy,
  IconCut,
  IconDownload,
  IconEdit,
  IconExternalLink,
  IconFile,
  IconFolder,
  IconFolderPlus,
  IconLogout,
  IconPencil,
  IconPlus,
  IconRefresh,
  IconSettings,
  IconShare,
  IconStar,
  IconTrash,
  IconUpload,
  IconUser,
  IconUserCircle,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
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
    <section
      data-demo
      className='flex grow flex-col items-center justify-center gap-8'
    >
      <div className='grid w-full max-w-3xl gap-8 md:grid-cols-2'>
        <FileActionsMenu />
        <EditorViewOptionsMenu />
        <TextAlignmentMenu />
        <UserAccountMenu />
        <ContextActionsMenu />
        <MenuInDialogDemo />
      </div>
    </section>
  );
}

/* ———————————————————————————————————————————————————— */
/*  1. File Actions — Common file operations             */
/* ———————————————————————————————————————————————————— */

function FileActionsMenu() {
  return (
    <div className='space-y-3'>
      <div>
        <Badge variant='secondary'>Action Menu</Badge>
        <p className='text-muted-foreground mt-1 text-sm'>
          File operations with icons and shortcuts
        </p>
      </div>

      <MenuRoot>
        <MenuTrigger>
          {(props) => (
            <Button {...props} variant='outline' className='w-full'>
              <IconFile size={18} />
              File Actions
            </Button>
          )}
        </MenuTrigger>

        <MenuPortal>
          <MenuContent>
            <MenuItem>
              <IconPlus size={16} />
              <span className='flex-1'>New File</span>
              <kbd>
                <IconCommand /> <IconArrowUp /> <span>N</span>
              </kbd>
            </MenuItem>
            <MenuItem>
              <IconFolderPlus size={16} />
              <span className='flex-1'>New Folder</span>
              <kbd>
                <IconCommand /> <IconArrowUp /> <span>D</span>
              </kbd>
            </MenuItem>
            <MenuSeparator />
            <MenuItem>
              <IconUpload size={16} />
              <span className='flex-1'>Upload</span>
            </MenuItem>
            <MenuItem>
              <IconDownload size={16} />
              <span className='flex-1'>Download</span>
              <kbd>
                <IconCommand /> <IconArrowUp /> <span>J</span>
              </kbd>
            </MenuItem>
            <MenuSeparator />
            <MenuItem>
              <IconShare size={16} />
              <span className='flex-1'>Share</span>
            </MenuItem>
            <MenuItem>
              <IconStar size={16} />
              <span className='flex-1'>Add to Favorites</span>
            </MenuItem>
            <MenuSeparator />
            <MenuItem variant='destructive'>
              <IconTrash size={16} />
              <span className='flex-1'>Move to Trash</span>
              <kbd>
                <IconCommand /> <IconArrowUp /> <span>Backspace</span>
              </kbd>
            </MenuItem>
          </MenuContent>
        </MenuPortal>
      </MenuRoot>
    </div>
  );
}

/* ———————————————————————————————————————————————————— */
/*  2. Editor View Options — Checkbox items              */
/* ———————————————————————————————————————————————————— */

function EditorViewOptionsMenu() {
  const [viewOptions, setViewOptions] = useState({
    lineNumbers: true,
    minimap: true,
    wordWrap: false,
    whitespace: false,
    indentGuides: true,
  });

  return (
    <div className='space-y-3'>
      <div>
        <Badge variant='secondary'>Checkbox Menu</Badge>
        <p className='text-muted-foreground mt-1 text-sm'>
          Toggle editor preferences
        </p>
      </div>

      <MenuRoot>
        <MenuTrigger>
          {(props) => (
            <Button {...props} variant='outline' className='w-full'>
              <IconSettings size={18} />
              View Options
            </Button>
          )}
        </MenuTrigger>

        <MenuPortal>
          <MenuContent>
            <MenuCheckboxItem
              checked={viewOptions.lineNumbers}
              disableCloseOnChange
              onChange={(v) =>
                setViewOptions((s) => ({ ...s, lineNumbers: v }))
              }
            >
              <span className='flex-1'>Line Numbers</span>
              {viewOptions.lineNumbers && <IconCheck size={16} />}
            </MenuCheckboxItem>

            <MenuCheckboxItem
              checked={viewOptions.minimap}
              disableCloseOnChange
              onChange={(v) => setViewOptions((s) => ({ ...s, minimap: v }))}
            >
              <span className='flex-1'>Minimap</span>
              {viewOptions.minimap && <IconCheck size={16} />}
            </MenuCheckboxItem>

            <MenuCheckboxItem
              checked={viewOptions.wordWrap}
              disableCloseOnChange
              onChange={(v) => setViewOptions((s) => ({ ...s, wordWrap: v }))}
            >
              <span className='flex-1'>Word Wrap</span>
              {viewOptions.wordWrap && <IconCheck size={16} />}
            </MenuCheckboxItem>

            <MenuSeparator />

            <MenuCheckboxItem
              checked={viewOptions.whitespace}
              disableCloseOnChange
              onChange={(v) => setViewOptions((s) => ({ ...s, whitespace: v }))}
            >
              <span className='flex-1'>Show Whitespace</span>
              {viewOptions.whitespace && <IconCheck size={16} />}
            </MenuCheckboxItem>

            <MenuCheckboxItem
              checked={viewOptions.indentGuides}
              disableCloseOnChange
              onChange={(v) =>
                setViewOptions((s) => ({ ...s, indentGuides: v }))
              }
            >
              <span className='flex-1'>Indent Guides</span>
              {viewOptions.indentGuides && <IconCheck size={16} />}
            </MenuCheckboxItem>
          </MenuContent>
        </MenuPortal>
      </MenuRoot>
    </div>
  );
}

/* ———————————————————————————————————————————————————— */
/*  3. Text Alignment — Radio group pattern              */
/* ———————————————————————————————————————————————————— */

function TextAlignmentMenu() {
  const [alignment, setAlignment] = useState('left');
  const [spacing, setSpacing] = useState('single');

  return (
    <div className='space-y-3'>
      <div>
        <Badge variant='secondary'>Radio Menu</Badge>
        <p className='text-muted-foreground mt-1 text-sm'>
          Exclusive selection with radio groups
        </p>
      </div>

      <MenuRoot>
        <MenuTrigger>
          {(props) => (
            <Button {...props} variant='outline' className='w-full'>
              <IconPencil size={18} />
              Text Format
            </Button>
          )}
        </MenuTrigger>

        <MenuPortal>
          <MenuContent>
            <MenuGroup>
              <MenuGroupLabel>Alignment</MenuGroupLabel>
              <MenuGroupContent>
                <MenuRadioGroup value={alignment} onChange={setAlignment}>
                  <MenuRadioItem value='left'>
                    <span className='flex-1'>Left</span>
                    {alignment === 'left' && <IconCheck size={16} />}
                  </MenuRadioItem>
                  <MenuRadioItem value='center'>
                    <span className='flex-1'>Center</span>
                    {alignment === 'center' && <IconCheck size={16} />}
                  </MenuRadioItem>
                  <MenuRadioItem value='right'>
                    <span className='flex-1'>Right</span>
                    {alignment === 'right' && <IconCheck size={16} />}
                  </MenuRadioItem>
                  <MenuRadioItem value='justify'>
                    <span className='flex-1'>Justify</span>
                    {alignment === 'justify' && <IconCheck size={16} />}
                  </MenuRadioItem>
                </MenuRadioGroup>
              </MenuGroupContent>
            </MenuGroup>

            <MenuSeparator />

            <MenuGroup>
              <MenuGroupLabel>Line Spacing</MenuGroupLabel>
              <MenuGroupContent>
                <MenuRadioGroup value={spacing} onChange={setSpacing}>
                  <MenuRadioItem value='single'>
                    <span className='flex-1'>Single</span>
                    {spacing === 'single' && <IconCheck size={16} />}
                  </MenuRadioItem>
                  <MenuRadioItem value='1.5'>
                    <span className='flex-1'>1.5 Lines</span>
                    {spacing === '1.5' && <IconCheck size={16} />}
                  </MenuRadioItem>
                  <MenuRadioItem value='double'>
                    <span className='flex-1'>Double</span>
                    {spacing === 'double' && <IconCheck size={16} />}
                  </MenuRadioItem>
                </MenuRadioGroup>
              </MenuGroupContent>
            </MenuGroup>
          </MenuContent>
        </MenuPortal>
      </MenuRoot>
    </div>
  );
}

/* ———————————————————————————————————————————————————— */
/*  4. User Account — Profile menu with groups           */
/* ———————————————————————————————————————————————————— */

function UserAccountMenu() {
  return (
    <div className='space-y-3'>
      <div>
        <Badge variant='secondary'>Grouped Menu</Badge>
        <p className='text-muted-foreground mt-1 text-sm'>
          Account menu with labeled sections
        </p>
      </div>

      <MenuRoot loop>
        <MenuTrigger>
          {(props) => (
            <Button {...props} variant='outline' className='w-full'>
              <IconUserCircle size={18} />
              My Account
            </Button>
          )}
        </MenuTrigger>

        <MenuPortal>
          <MenuContent>
            <div className='border-b px-3 py-2'>
              <p className='text-sm font-medium'>Muhammad Zeeshan</p>
              <p className='text-muted-foreground text-xs'>
                zeeshan@example.com
              </p>
            </div>

            <div className='py-1'>
              <MenuGroup>
                <MenuGroupLabel>Account</MenuGroupLabel>
                <MenuGroupContent>
                  <MenuItem>
                    <IconUser size={16} />
                    <span className='flex-1'>Profile</span>
                  </MenuItem>
                  <MenuItem>
                    <IconSettings size={16} />
                    <span className='flex-1'>Settings</span>
                  </MenuItem>
                </MenuGroupContent>
              </MenuGroup>

              <MenuSeparator />

              <MenuGroup>
                <MenuGroupLabel>Support</MenuGroupLabel>
                <MenuGroupContent>
                  <MenuItem>
                    <IconExternalLink size={16} />
                    <span className='flex-1'>Documentation</span>
                  </MenuItem>
                  <MenuItem disabled>
                    <IconRefresh size={16} />
                    <span className='flex-1'>Check for Updates</span>
                  </MenuItem>
                </MenuGroupContent>
              </MenuGroup>

              <MenuSeparator />

              <MenuItem variant='destructive'>
                <IconLogout size={16} />
                <span className='flex-1'>Sign Out</span>
              </MenuItem>
            </div>
          </MenuContent>
        </MenuPortal>
      </MenuRoot>
    </div>
  );
}

/* ———————————————————————————————————————————————————— */
/*  5. Context Actions — Edit/Delete pattern             */
/* ———————————————————————————————————————————————————— */

function ContextActionsMenu() {
  return (
    <div className='space-y-3'>
      <div>
        <Badge variant='secondary'>Context Menu</Badge>
        <p className='text-muted-foreground mt-1 text-sm'>
          Common edit actions with clipboard support
        </p>
      </div>

      <MenuRoot>
        <MenuTrigger>
          {(props) => (
            <Button {...props} variant='outline' className='w-full'>
              <IconEdit size={18} />
              Edit Actions
            </Button>
          )}
        </MenuTrigger>

        <MenuPortal>
          <MenuContent>
            <MenuItem>
              <IconCut size={16} />
              <span className='flex-1'>Cut</span>
              <kbd>
                <IconCommand /> <span>X</span>
              </kbd>
            </MenuItem>
            <MenuItem>
              <IconCopy size={16} />
              <span className='flex-1'>Copy</span>
              <kbd>
                <IconCommand /> <span>C</span>
              </kbd>
            </MenuItem>
            <MenuItem>
              <IconClipboard size={16} />
              <span className='flex-1'>Paste</span>
              <kbd>
                <IconCommand /> <span>V</span>
              </kbd>
            </MenuItem>
            <MenuSeparator />
            <MenuItem>
              <IconPencil size={16} />
              <span className='flex-1'>Rename</span>
              <kbd>
                <span>F2</span>
              </kbd>
            </MenuItem>
            <MenuItem>
              <IconFolder size={16} />
              <span className='flex-1'>Move to...</span>
            </MenuItem>
            <MenuSeparator />
            <MenuItem variant='destructive'>
              <IconTrash size={16} />
              <span className='flex-1'>Delete</span>
              <kbd>
                <span>Backspace</span>
              </kbd>
            </MenuItem>
          </MenuContent>
        </MenuPortal>
      </MenuRoot>
    </div>
  );
}

/* ———————————————————————————————————————————————————— */
/*  6. Menu in Dialog — Layer management demo            */
/* ———————————————————————————————————————————————————— */

function MenuInDialogDemo() {
  return (
    <div className='space-y-3'>
      <div>
        <Badge variant='secondary'>Nested Layers</Badge>
        <p className='text-muted-foreground mt-1 text-sm'>
          Menu inside dialog with proper stacking
        </p>
      </div>

      <DialogRoot>
        <DialogTrigger>
          {(props) => (
            <Button {...props} variant='outline' className='w-full'>
              Open Dialog with Menu
            </Button>
          )}
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Document Settings</DialogTitle>
              <DialogDescription>
                Configure document options. The menu will layer correctly above
                this dialog.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose>
                {(props) => (
                  <Button {...props} variant='outline'>
                    Cancel
                  </Button>
                )}
              </DialogClose>

              <MenuRoot>
                <MenuTrigger>
                  {(props) => (
                    <Button {...props} variant='secondary'>
                      <IconSettings size={16} />
                      More Options
                    </Button>
                  )}
                </MenuTrigger>

                <MenuPortal>
                  <MenuContent className='w-[max(var(--reference-width),200px)]'>
                    <MenuItem>
                      <IconDownload size={16} />
                      Export as PDF
                    </MenuItem>
                    <MenuItem>
                      <IconShare size={16} />
                      Share Document
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem variant='destructive'>
                      <IconTrash size={16} />
                      Delete Document
                    </MenuItem>
                  </MenuContent>
                </MenuPortal>
              </MenuRoot>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </div>
  );
}
