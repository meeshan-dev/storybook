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
    <div className='story'>
      <h1>Radio Group</h1>

      <p>
        Implements the{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/radio/'
          target='_blank'
        >
          WAI-ARIA Radio Pattern
        </a>
      </p>

      <h2>Interactive demo</h2>

      <p>
        Pricing plans, shipping options, theme selector, and payment methods
      </p>

      <hr />

      <RadioDemo />

      <hr />

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          <strong>Native input foundation</strong> — Uses{' '}
          <code>&lt;input type="radio"&gt;</code> with <code>name</code> for
          browser-native grouping
        </li>
        <li>
          <strong>CSS-driven visuals</strong> — <code>:checked</code> and{' '}
          <code>has-[input:checked]</code> for zero-JS indicator updates
        </li>
        <li>
          <strong>Icon slot system</strong> — <code>RadioIcon</code> with{' '}
          <code>type="box"</code> and <code>type="check"</code> for conditional
          rendering
        </li>
        <li>
          <strong>Form integration</strong> — Works with native forms and
          controlled/uncontrolled patterns
        </li>
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

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
