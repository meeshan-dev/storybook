import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { RadioDemo } from './radio-demo';
import sourceCode from './radio?raw';

const meta: Meta = {
  title: 'components-deep-dive/Radio',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Radio',
  render: () => (
    <div className='story typography'>
      <h1>Radio Group</h1>

      <p>
        An accessible radio group component implementing the{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/radio/'
          target='_blank'
        >
          WAI-ARIA Radio Group Pattern
        </a>
        . Built on native HTML radio inputs with React Context for group state
        management.
      </p>

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          <strong>Native input foundation</strong> — Uses{' '}
          <code>&lt;input type="radio"&gt;</code> with <code>name</code>{' '}
          attribute for browser-native grouping
        </li>
        <li>
          <strong>Context-based state</strong> — <code>RadioGroupRoot</code>{' '}
          manages selection state, individual <code>Radio</code> components
          subscribe automatically
        </li>
        <li>
          <strong>CSS-driven visuals</strong> — Uses <code>:checked</code> and{' '}
          <code>group-has-[input:checked]</code> for zero-JS indicator updates
        </li>
        <li>
          <strong>Icon slot system</strong> — <code>RadioIcon</code> with{' '}
          <code>type="box"</code> and <code>type="check"</code> for conditional
          rendering
        </li>
        <li>
          <strong>Form integration</strong> — Works with native form submission
          and controlled/uncontrolled patterns
        </li>
      </ul>

      <div className='story-demo not-typography'>
        <h2>Interactive Examples</h2>
        <p className='text-muted-foreground mb-6'>
          Pricing plans, shipping options, theme selector, and payment methods
        </p>
        <div>
          <RadioDemo />
        </div>
      </div>

      <h2>Keyboard Interactions</h2>

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
                <code>Tab</code>
              </td>
              <td className='py-2'>
                Move focus into/out of the radio group (focuses checked item or
                first item)
              </td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>↓</code> <code>→</code>
              </td>
              <td className='py-2'>Move focus and selection to next radio</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>↑</code> <code>←</code>
              </td>
              <td className='py-2'>
                Move focus and selection to previous radio
              </td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>
                <code>Space</code>
              </td>
              <td className='py-2'>Select the focused radio</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Radio vs Checkbox</h2>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='py-2 pr-4 text-left font-semibold'>Aspect</th>
              <th className='py-2 pr-4 text-left font-semibold'>Radio</th>
              <th className='py-2 text-left font-semibold'>Checkbox</th>
            </tr>
          </thead>
          <tbody className='text-muted-foreground'>
            <tr className='border-b'>
              <td className='py-2 pr-4'>Selection</td>
              <td className='py-2 pr-4'>Exactly one from group</td>
              <td className='py-2'>Any number (0 to all)</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>Deselection</td>
              <td className='py-2 pr-4'>Only by selecting another</td>
              <td className='py-2'>Toggle individually</td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>Use case</td>
              <td className='py-2 pr-4'>Mutually exclusive options</td>
              <td className='py-2'>Independent options</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Accessibility Features</h2>

      <ul>
        <li>
          Native <code>role="radio"</code> from HTML input
        </li>
        <li>
          Grouped by <code>name</code> attribute for screen readers
        </li>
        <li>
          Arrow key navigation moves focus AND selection (standard pattern)
        </li>
        <li>Visible focus ring with proper contrast</li>
        <li>Disabled state properly announced and prevents interaction</li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
