import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { AccordionDemo } from './accordion-demo';
import sourceCode from './accordion?raw';

const meta: Meta = {
  title: 'components-deep-dive/Accordion',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Accordion',
  render: () => (
    <div className='story typography'>
      <h1>Accordion</h1>

      <p>
        Accessible accordion component built from first principles. Implements
        the{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/accordion/'
          target='_blank'
        >
          WAI-ARIA Accordion Pattern
        </a>{' '}
        with full keyboard navigation, screen reader support, and flexible
        expansion modes.
      </p>

      <div className='story-demo not-typography'>
        <h2>Interactive Examples</h2>
        <p>
          Three real-world use cases demonstrating different expansion modes
        </p>
        <div>
          <AccordionDemo />
        </div>
      </div>

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          Proper <code>aria-expanded</code> state on triggers
        </li>
        <li>
          <code>aria-controls</code> linking triggers to their content regions
        </li>
        <li>
          Content regions use <code>role="region"</code> with{' '}
          <code>aria-labelledby</code>
        </li>
        <li>Configurable heading levels for semantic document structure</li>
        <li>
          <strong>Multiple</strong>: Any number of panels can be open
          simultaneously
        </li>
        <li>
          <strong>Single Collapsible</strong>: One panel at a time, can collapse
          all
        </li>
        <li>
          <strong>Single Non-Collapsible</strong>: Exactly one panel always open
        </li>
        <li>Disabled items are properly announced and skip keyboard focus</li>
        <li>
          <strong>motion/react integration</strong> for smooth height animations
          with <code>AnimatePresence</code>
        </li>
        <li>
          <strong>TypeScript discriminated unions</strong> for type-safe props
          based on expansion mode
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
              <td className='py-2'>Toggle the focused accordion panel</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>↓</code> Arrow Down
              </td>
              <td className='py-2'>Move focus to next accordion trigger</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>↑</code> Arrow Up
              </td>
              <td className='py-2'>Move focus to previous accordion trigger</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>Home</code>
              </td>
              <td className='py-2'>Move focus to first accordion trigger</td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>
                <code>End</code>
              </td>
              <td className='py-2'>Move focus to last accordion trigger</td>
            </tr>
          </tbody>
        </table>
      </div>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
