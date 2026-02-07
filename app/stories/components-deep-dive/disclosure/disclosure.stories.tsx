import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { DisclosureDemo } from './disclosure-demo';
import sourceCode from './disclosure?raw';

const meta: Meta = {
  title: 'components-deep-dive/Disclosure',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Disclosure',
  render: () => (
    <div className='story typography'>
      <h1>Disclosure</h1>

      <p>
        Implements the{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/'
          target='_blank'
        >
          WAI-ARIA Disclosure Pattern
        </a>
      </p>

      <div className='story-demo not-typography'>
        <h2>Interactive demo</h2>
        <p>FAQ section, settings panel, filter sidebar, and feature details</p>
        <div>
          <DisclosureDemo />
        </div>
      </div>

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          Proper trigger semantics with <code>aria-expanded</code> and{' '}
          <code>aria-controls</code>
        </li>
        <li>
          Content linked to triggers via <code>aria-labelledby</code>
        </li>
        <li>
          Multiple expansion modes:
          <strong>Multiple</strong>, <strong>Single Collapsible</strong>,{' '}
          <strong>Single Non-Collapsible</strong>
        </li>
        <li>
          Disabled panels are announced and skipped in keyboard navigation
        </li>
        <li>
          Smooth height animations via <strong>motion/react</strong> and{' '}
          <code>AnimatePresence</code>
        </li>
        <li>
          Type-safe props with <strong>TypeScript discriminated unions</strong>
        </li>
      </ul>

      <h2>Keyboard Navigation</h2>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='py-2 pr-4 text-left font-semibold'>Key</th>
              <th className='py-2 text-left font-semibold'>Action</th>
            </tr>
          </thead>
          <tbody className='text-muted-foreground'>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>Enter</code> / <code>Space</code>
              </td>
              <td className='py-2'>Toggle the focused disclosure panel</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>Tab</code> / <code>Shift + Tab</code>
              </td>
              <td className='py-2'>Move focus between triggers</td>
            </tr>
          </tbody>
        </table>
      </div>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
