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
    <div className='story'>
      <h1>Checkbox</h1>

      <p>
        Implements the{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/'
          target='_blank'
        >
          WAI-ARIA Checkbox Pattern
        </a>
      </p>

      <h2>Interactive demo</h2>

      <p>
        Task lists, permissions matrix, terms acceptance, and feature selection
      </p>

      <hr />

      <CheckboxDemo />

      <hr />

      <h2>Fearutes</h2>

      <ul>
        <li>
          Native <code>&lt;input type="checkbox"&gt;</code> for built-in
          accessibility and form support
        </li>
        <li>
          Supports <strong>checked</strong>, <strong>unchecked</strong>, and
          <strong>indeterminate</strong> states
        </li>
        <li>
          Conditional icon rendering via <code>CheckboxIcon</code>(
          <code>box</code>, <code>check</code>, <code>indeterminate</code>)
        </li>
        <li>
          Proper indeterminate semantics with <code>aria-checked="mixed"</code>
        </li>
        <li>Works with React state and native form submission</li>
      </ul>

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
