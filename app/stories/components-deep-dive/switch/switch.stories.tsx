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
        Implements the{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/switch/'
          target='_blank'
        >
          WAI-ARIA Switch Pattern
        </a>
      </p>

      <div className='story-demo not-typography'>
        <h2>Interactive Examples</h2>
        <p>
          Notification preferences, privacy settings, and custom feature toggles
        </p>
        <div>
          <SwitchDemo />
        </div>
      </div>

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          <strong>Native checkbox foundation</strong> —{' '}
          <code>&lt;input type="checkbox"&gt;</code> for built-in form support
          and accessibility
        </li>
        <li>
          <strong>CSS-driven visuals</strong> — Uses <code>:checked</code> and{' '}
          <code>has-[input:checked]</code> for zero-JS re-renders
        </li>
        <li>
          <strong>Icon slot system</strong> — <code>SwitchIcon</code> components
          indicate on/off state
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
                <code>Space</code>
              </td>
              <td className='py-2'>Toggle switch state</td>
            </tr>
          </tbody>
        </table>
      </div>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
