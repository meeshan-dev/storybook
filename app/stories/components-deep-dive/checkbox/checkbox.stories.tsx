import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { CheckboxDemo } from './checkbox-demo';
import sourceCode from './checkbox?raw';

const meta: Meta = {
  title: 'components-deep-dive/Checkbox',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Checkbox',
  render: () => (
    <div className='story typography'>
      <h1>Checkbox</h1>

      <p>
        An accessible checkbox component implementing the{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/'
          target='_blank'
        >
          WAI-ARIA Checkbox Pattern
        </a>
        . Built on native HTML checkbox with support for the indeterminate
        (mixed) state.
      </p>

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          <strong>Native checkbox foundation</strong> — Uses{' '}
          <code>&lt;input type="checkbox"&gt;</code> for built-in form handling
          and accessibility
        </li>
        <li>
          <strong>Tri-state support</strong> — Handles checked, unchecked, and
          indeterminate states via <code>HTMLInputElement.indeterminate</code>
        </li>
        <li>
          <strong>Icon slot system</strong> —{' '}
          <code>CheckboxIcon</code> with <code>type="box"</code>,{' '}
          <code>"check"</code>, and <code>"indeterminate"</code> for conditional
          rendering
        </li>
        <li>
          <strong>Proper ARIA</strong> — Uses <code>aria-checked="mixed"</code>{' '}
          for indeterminate state
        </li>
        <li>
          <strong>Controlled & uncontrolled</strong> — Works with React state or
          native form submission
        </li>
      </ul>

      <div className='story-demo not-typography'>
        <h2>Interactive Examples</h2>
        <p className='text-muted-foreground mb-6'>
          Task lists, permissions matrix, terms acceptance, and feature selection
        </p>
        <div>
          <CheckboxDemo />
        </div>
      </div>

      <h2>Indeterminate State</h2>

      <p>
        The indeterminate state represents a "mixed" selection — useful for
        parent checkboxes that control a group of child checkboxes where only
        some are selected.
      </p>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='py-2 pr-4 text-left font-semibold'>
                Child Selection
              </th>
              <th className='py-2 text-left font-semibold'>Parent State</th>
            </tr>
          </thead>
          <tbody className='text-muted-foreground'>
            <tr className='border-b'>
              <td className='py-2 pr-4'>None selected</td>
              <td className='py-2'>Unchecked</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>Some selected</td>
              <td className='py-2'>
                Indeterminate (<code>aria-checked="mixed"</code>)
              </td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>All selected</td>
              <td className='py-2'>Checked</td>
            </tr>
          </tbody>
        </table>
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
              <td className='py-2'>Toggle checkbox state</td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>
                <code>Tab</code>
              </td>
              <td className='py-2'>Move focus to next focusable element</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Accessibility Features</h2>

      <ul>
        <li>
          Native <code>role="checkbox"</code> from HTML input
        </li>
        <li>
          Proper <code>aria-checked</code> values: <code>"true"</code>,{' '}
          <code>"false"</code>, or <code>"mixed"</code>
        </li>
        <li>Clickable label for larger hit target</li>
        <li>Visible focus ring with proper contrast</li>
        <li>Disabled state prevents interaction and is announced</li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
