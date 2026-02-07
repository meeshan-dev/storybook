import {
  IconBold,
  IconCode,
  IconCopy,
  IconDownload,
  IconEdit,
  IconHelp,
  IconInfoCircle,
  IconItalic,
  IconLink,
  IconShare,
  IconTrash,
  IconUnderline,
} from '@tabler/icons-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from '~/components/ui/input-group';
import { Label } from '~/components/ui/label';
import {
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from './tooltip';

export function TooltipDemo() {
  return (
    <section data-demo className='flex grow flex-col gap-12'>
      {/* Toolbar Actions */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Toolbar Actions</h3>
          <p className='text-muted-foreground text-sm'>
            Icon buttons with tooltips showing action names and keyboard
            shortcuts
          </p>
        </div>
        <ToolbarActions />
      </section>

      {/* Text Formatting */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Text Formatting</h3>
          <p className='text-muted-foreground text-sm'>
            Rich text editor toolbar with tooltip descriptions
          </p>
        </div>
        <TextFormattingToolbar />
      </section>

      {/* Form Field Hints */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Form Field Hints</h3>
          <p className='text-muted-foreground text-sm'>
            Help icons with contextual information tooltips
          </p>
        </div>
        <FormFieldHints />
      </section>

      {/* Placement Examples */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Placement Options</h3>
          <p className='text-muted-foreground text-sm'>
            Tooltips can appear on any side with automatic collision detection
          </p>
        </div>
        <PlacementExamples />
      </section>

      {/* Interactive Tooltip */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>Interactive Tooltips</h3>
          <p className='text-muted-foreground text-sm'>
            Tooltips with actionable content that stay open on hover
          </p>
        </div>
        <InteractiveTooltips />
      </section>
    </section>
  );
}

/* ---------------------------------- */
/* 1. Toolbar Actions                  */
/* ---------------------------------- */

const toolbarActions = [
  { icon: IconEdit, label: 'Edit' },
  { icon: IconCopy, label: 'Copy' },
  { icon: IconShare, label: 'Share' },
  { icon: IconDownload, label: 'Download' },
  { icon: IconTrash, label: 'Delete' },
];

function ToolbarActions() {
  return (
    <div className='inline-flex items-center gap-1'>
      {toolbarActions.map((action) => (
        <TooltipRoot key={action.label}>
          <TooltipTrigger>
            {(props) => (
              <Button {...props} size='icon' variant='outline'>
                <action.icon />
              </Button>
            )}
          </TooltipTrigger>

          <TooltipPortal>
            <TooltipContent>{action.label}</TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      ))}
    </div>
  );
}

/* ---------------------------------- */
/* 2. Text Formatting Toolbar          */
/* ---------------------------------- */

const formattingOptions = [
  { icon: IconBold, label: 'Bold' },
  { icon: IconItalic, label: 'Italic' },
  { icon: IconUnderline, label: 'Underline' },
  { icon: IconLink, label: 'Insert Link' },
  { icon: IconCode, label: 'Code' },
];

function TextFormattingToolbar() {
  return (
    <InputGroup className='w-full max-w-md'>
      <InputGroupAddon align='block-start' className='border-b'>
        {formattingOptions.map((option) => (
          <TooltipRoot key={option.label} showDelay={200}>
            <TooltipTrigger>
              {(props) => (
                <Button {...props} size='icon' variant='ghost'>
                  <option.icon />
                </Button>
              )}
            </TooltipTrigger>

            <TooltipPortal>
              <TooltipContent>{option.label}</TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        ))}
      </InputGroupAddon>

      <InputGroupTextarea rows={3} placeholder='Start typing...' />
    </InputGroup>
  );
}

/* ---------------------------------- */
/* 3. Form Field Hints                 */
/* ---------------------------------- */

function FormFieldHints() {
  return (
    <div className='max-w-sm space-y-4'>
      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <Label>API Key</Label>
          <TooltipRoot>
            <TooltipTrigger>
              {(props) => (
                <Button {...props} size='icon-sm' variant='ghost'>
                  <IconHelp />
                </Button>
              )}
            </TooltipTrigger>

            <TooltipPortal>
              <TooltipContent placement='right' className='max-w-xs'>
                <strong>Where to find your API key:</strong>
                <p className='text-muted-foreground mt-1'>
                  Go to Settings → Developer → API Keys to generate a new key.
                </p>
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </div>

        <Input type='password' placeholder='sk_live_...' className='max-w-sm' />
      </div>

      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <Label>Webhook URL</Label>
          <TooltipRoot>
            <TooltipTrigger>
              {(props) => (
                <Button {...props} size='icon-sm' variant='ghost'>
                  <IconInfoCircle />
                </Button>
              )}
            </TooltipTrigger>

            <TooltipPortal>
              <TooltipContent placement='right' className='max-w-xs'>
                <strong>Webhook Requirements:</strong>
                <ul className='text-muted-foreground mt-1 list-inside list-disc text-xs'>
                  <li>Must be a valid HTTPS URL</li>
                  <li>Should respond within 30 seconds</li>
                  <li>Return 2xx status code</li>
                </ul>
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </div>
        <Input
          type='url'
          placeholder='https://your-server.com/webhook'
          className='max-w-sm'
        />
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* 4. Placement Examples               */
/* ---------------------------------- */

const placements = ['top', 'right', 'bottom', 'left'] as const;

function PlacementExamples() {
  return (
    <div className='flex flex-wrap items-center gap-3'>
      {placements.map((placement) => (
        <TooltipRoot key={placement}>
          <TooltipTrigger>
            {(props) => (
              <Button {...props} variant='outline' size='sm'>
                {placement.charAt(0).toUpperCase() + placement.slice(1)}
              </Button>
            )}
          </TooltipTrigger>

          <TooltipPortal>
            <TooltipContent placement={placement}>
              Tooltip on {placement}
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      ))}
    </div>
  );
}

/* ---------------------------------- */
/* 5. Interactive Tooltips             */
/* ---------------------------------- */

function InteractiveTooltips() {
  return (
    <div className='flex flex-wrap items-center gap-4'>
      <TooltipRoot>
        <TooltipTrigger>
          {(props) => (
            <Button {...props} variant='secondary'>
              User Info
            </Button>
          )}
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent
            placement='top'
            disableInteractive={false}
            className='relative w-64 shadow-lg'
          >
            <div className='flex items-center gap-3'>
              <div className='flex size-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 font-semibold text-white'>
                JD
              </div>
              <div>
                <p className='font-semibold'>John Doe</p>
                <p className='text-muted-foreground text-xs'>Senior Engineer</p>
              </div>
            </div>

            <div className='mt-3 flex gap-2'>
              <Button size='xs' variant='outline' className='flex-1'>
                Profile
              </Button>
              <Button size='xs' className='flex-1'>
                Message
              </Button>
            </div>
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>

      <TooltipRoot>
        <TooltipTrigger>
          {(props) => (
            <span
              {...props}
              className='border-muted-foreground cursor-help border-b border-dashed'
            >
              What is SSR?
            </span>
          )}
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent
            placement='top'
            disableInteractive={false}
            className='max-w-xs'
          >
            <p className='font-semibold'>Server-Side Rendering</p>
            <p className='text-muted-foreground mt-1 text-xs'>
              A technique where HTML is generated on the server for each
              request, improving initial load time and SEO.
            </p>
            <a
              href='#'
              className='mt-2 inline-block text-xs text-blue-600 hover:underline dark:text-blue-400'
            >
              Learn more →
            </a>
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </div>
  );
}
