import { FloatingArrow } from '@floating-ui/react';
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
import { cn } from '~/lib/utils';
import {
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from './tooltip';

export function TooltipDemo() {
  return (
    <main className='flex grow flex-col gap-12 py-10'>
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
    </main>
  );
}

/* ---------------------------------- */
/* 1. Toolbar Actions                  */
/* ---------------------------------- */

const toolbarActions = [
  { icon: IconEdit, label: 'Edit', shortcut: 'E' },
  { icon: IconCopy, label: 'Copy', shortcut: '⌘C' },
  { icon: IconShare, label: 'Share', shortcut: '⌘⇧S' },
  { icon: IconDownload, label: 'Download', shortcut: '⌘D' },
  { icon: IconTrash, label: 'Delete', shortcut: '⌫', destructive: true },
];

function ToolbarActions() {
  return (
    <div className='bg-card flex items-center gap-1 rounded-lg border p-2'>
      {toolbarActions.map((action, index) => (
        <TooltipRoot key={action.label}>
          <TooltipTrigger>
            {(props) => (
              <button
                {...props}
                className={cn(
                  'flex size-9 items-center justify-center rounded-md transition-colors',
                  'hover:bg-muted focus:ring-ring/50 focus:ring-2 focus:outline-none',
                  action.destructive &&
                    'hover:bg-red-100 dark:hover:bg-red-950/50',
                )}
              >
                <action.icon
                  className={cn(
                    'size-5',
                    action.destructive
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-muted-foreground',
                  )}
                />
              </button>
            )}
          </TooltipTrigger>

          <TooltipPortal>
            <TooltipContent placement='bottom'>
              {({ props, arrowProps }) => (
                <TooltipBox {...props} arrowProps={arrowProps}>
                  <span>{action.label}</span>
                  <kbd className='bg-foreground/10 ml-2 rounded px-1.5 py-0.5 font-mono text-xs'>
                    {action.shortcut}
                  </kbd>
                </TooltipBox>
              )}
            </TooltipContent>
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
  { icon: IconBold, label: 'Bold', shortcut: '⌘B' },
  { icon: IconItalic, label: 'Italic', shortcut: '⌘I' },
  { icon: IconUnderline, label: 'Underline', shortcut: '⌘U' },
  { icon: IconLink, label: 'Insert Link', shortcut: '⌘K' },
  { icon: IconCode, label: 'Code', shortcut: '⌘E' },
];

function TextFormattingToolbar() {
  return (
    <div className='max-w-lg'>
      <div className='bg-muted/30 flex items-center gap-0.5 rounded-t-lg border border-b-0 px-2 py-1.5'>
        {formattingOptions.map((option) => (
          <TooltipRoot key={option.label} showDelay={200}>
            <TooltipTrigger>
              {(props) => (
                <button
                  {...props}
                  className='hover:bg-background focus:ring-ring/50 flex size-8 items-center justify-center rounded transition-colors focus:ring-2 focus:outline-none'
                >
                  <option.icon className='text-muted-foreground size-4' />
                </button>
              )}
            </TooltipTrigger>

            <TooltipPortal>
              <TooltipContent placement='top'>
                {({ props, arrowProps }) => (
                  <TooltipBox {...props} arrowProps={arrowProps}>
                    {option.label}
                    <kbd className='bg-foreground/10 ml-2 rounded px-1.5 py-0.5 font-mono text-xs'>
                      {option.shortcut}
                    </kbd>
                  </TooltipBox>
                )}
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        ))}
      </div>
      <textarea
        className='bg-background focus:ring-ring/50 w-full resize-none rounded-b-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
        rows={3}
        placeholder='Start typing...'
      />
    </div>
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
          <label className='text-sm font-medium'>API Key</label>
          <TooltipRoot>
            <TooltipTrigger>
              {(props) => (
                <button
                  {...props}
                  className='text-muted-foreground hover:text-foreground focus:ring-ring/50 rounded transition-colors focus:ring-2 focus:outline-none'
                >
                  <IconHelp className='size-4' />
                </button>
              )}
            </TooltipTrigger>

            <TooltipPortal>
              <TooltipContent placement='right'>
                {({ props, arrowProps }) => (
                  <TooltipBoxWide {...props} arrowProps={arrowProps}>
                    <strong>Where to find your API key:</strong>
                    <p className='text-muted-foreground mt-1'>
                      Go to Settings → Developer → API Keys to generate a new
                      key.
                    </p>
                  </TooltipBoxWide>
                )}
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </div>
        <input
          type='password'
          placeholder='sk_live_...'
          className='bg-background focus:ring-ring/50 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
        />
      </div>

      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <label className='text-sm font-medium'>Webhook URL</label>
          <TooltipRoot>
            <TooltipTrigger>
              {(props) => (
                <button
                  {...props}
                  className='focus:ring-ring/50 rounded text-blue-600 focus:ring-2 focus:outline-none dark:text-blue-400'
                >
                  <IconInfoCircle className='size-4' />
                </button>
              )}
            </TooltipTrigger>

            <TooltipPortal>
              <TooltipContent placement='right'>
                {({ props, arrowProps }) => (
                  <TooltipBoxWide {...props} arrowProps={arrowProps}>
                    <strong>Webhook Requirements:</strong>
                    <ul className='text-muted-foreground mt-1 list-inside list-disc text-xs'>
                      <li>Must be a valid HTTPS URL</li>
                      <li>Should respond within 30 seconds</li>
                      <li>Return 2xx status code</li>
                    </ul>
                  </TooltipBoxWide>
                )}
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </div>
        <input
          type='url'
          placeholder='https://your-server.com/webhook'
          className='bg-background focus:ring-ring/50 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
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
              {({ props, arrowProps }) => (
                <TooltipBox {...props} arrowProps={arrowProps}>
                  Tooltip on {placement}
                </TooltipBox>
              )}
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
          <TooltipContent placement='top' disableInteractive={false}>
            {({ props, arrowProps }) => (
              <div
                {...props}
                className='bg-card ring-foreground/10 relative z-50 w-64 rounded-xl p-4 text-sm shadow-lg ring-1 data-[hide=true]:hidden'
              >
                <FloatingArrow {...arrowProps} className='fill-foreground' />
                <div className='flex items-center gap-3'>
                  <div className='flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 font-semibold text-white'>
                    JD
                  </div>
                  <div>
                    <p className='font-semibold'>John Doe</p>
                    <p className='text-muted-foreground text-xs'>
                      Senior Engineer
                    </p>
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
              </div>
            )}
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
          <TooltipContent placement='top' disableInteractive={false}>
            {({ props, arrowProps }) => (
              <div
                {...props}
                className='bg-card ring-foreground/10 relative z-50 max-w-xs rounded-xl p-4 text-sm shadow-lg ring-1 data-[hide=true]:hidden'
              >
                <FloatingArrow {...arrowProps} className='fill-foreground' />
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
              </div>
            )}
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </div>
  );
}

/* ---------------------------------- */
/* Shared Tooltip Components           */
/* ---------------------------------- */

function TooltipBox({
  children,
  arrowProps,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  arrowProps: any;
}) {
  return (
    <div
      {...props}
      className='bg-foreground text-background relative z-50 flex items-center rounded-md px-3 py-1.5 text-sm data-[hide=true]:hidden'
    >
      <FloatingArrow {...arrowProps} className='fill-foreground' />
      {children}
    </div>
  );
}

function TooltipBoxWide({
  children,
  arrowProps,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  arrowProps: any;
}) {
  return (
    <div
      {...props}
      className='bg-card ring-foreground/10 relative z-50 max-w-xs rounded-lg p-3 text-sm shadow-lg ring-1 data-[hide=true]:hidden'
    >
      <FloatingArrow {...arrowProps} className='fill-foreground' />
      {children}
    </div>
  );
}
