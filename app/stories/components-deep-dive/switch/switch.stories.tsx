import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { SwitchDemo } from './switch-demo';
import sourceCode from './switch?raw';

const meta: Meta = {
  title: 'components-deep-dive/Switch',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Switch',
  render: () => (
    <div className='story typography'>
      <h1>Switch</h1>

      <p>
        An accessible toggle switch component implementing the{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/switch/'
          target='_blank'
        >
          WAI-ARIA Switch Pattern
        </a>
        . Built on native HTML checkbox for maximum browser compatibility while
        providing a clean visual toggle interface.
      </p>

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          <strong>Native checkbox foundation</strong> — Uses{' '}
          <code>&lt;input type="checkbox"&gt;</code> for built-in form support
          and accessibility
        </li>
        <li>
          <strong>CSS-driven visuals</strong> — Track and thumb styles use{' '}
          <code>:checked</code> pseudo-class via{' '}
          <code>group-has-[input:checked]</code> for zero JS re-renders
        </li>
        <li>
          <strong>Icon slot system</strong> — <code>SwitchIcon</code> components
          for on/off state indicators
        </li>
        <li>
          <strong>Compound components</strong> — Flexible composition with{' '}
          <code>SwitchRoot</code> and custom track/thumb elements
        </li>
        <li>
          <strong>Form integration</strong> — Works with form libraries and
          native form submission
        </li>
      </ul>

      <div className='story-demo not-typography'>
        <h2>Interactive Examples</h2>
        <p className='text-muted-foreground mb-6'>
          Notification preferences, privacy settings, and custom feature toggles
        </p>
        <div>
          <SwitchDemo />
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
                <code>Space</code>
              </td>
              <td className='py-2'>Toggle switch state</td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>
                <code>Enter</code>
              </td>
              <td className='py-2'>
                Toggle switch state (when using button role)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Switch vs Checkbox</h2>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='py-2 pr-4 text-left font-semibold'>Aspect</th>
              <th className='py-2 pr-4 text-left font-semibold'>Switch</th>
              <th className='py-2 text-left font-semibold'>Checkbox</th>
            </tr>
          </thead>
          <tbody className='text-muted-foreground'>
            <tr className='border-b'>
              <td className='py-2 pr-4'>Use case</td>
              <td className='py-2 pr-4'>Toggle settings on/off</td>
              <td className='py-2'>Select items from a list</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>Effect</td>
              <td className='py-2 pr-4'>Immediate</td>
              <td className='py-2'>Requires form submission</td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>States</td>
              <td className='py-2 pr-4'>On/Off only</td>
              <td className='py-2'>Checked/Unchecked/Indeterminate</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Accessibility Features</h2>

      <ul>
        <li>
          Uses <code>role="switch"</code> for proper screen reader announcement
        </li>
        <li>
          <code>aria-checked</code> reflects current state
        </li>
        <li>
          Associated label is clickable to toggle
        </li>
        <li>Visible focus ring for keyboard navigation</li>
        <li>Disabled state properly announced</li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
