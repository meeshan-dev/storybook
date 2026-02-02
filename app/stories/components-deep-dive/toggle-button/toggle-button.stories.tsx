import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { ToggleButtonDemo } from './toggle-button-demo';
import sourceCode from './toggle-button?raw';

const meta: Meta = {
  title: 'components-deep-dive/Toggle Button',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Toggle Button',
  render: () => (
    <div className='story typography'>
      <h1>Toggle Button</h1>

      <p>
        A pressable element that maintains an on/off state, perfect for toggling
        features, selecting options, or switching between modes. Can be used
        individually or grouped for exclusive (single) or multiple selection
        patterns.
      </p>

      <div className='story-demo not-typography'>
        <h2>Demo</h2>
        <p>
          Real-world patterns: view switchers, text formatting, alignment
          controls, quick actions, and sort toggles.
        </p>
        <div>
          <ToggleButtonDemo />
        </div>
      </div>

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          <strong>Type-safe generics</strong>: Exclusive mode uses{' '}
          <code>string | null</code> while multiple mode uses{' '}
          <code>string[]</code> for precise TypeScript inference.
        </li>
        <li>
          <strong>Context-based state management</strong>: Uses{' '}
          <code>createContextScope</code> for scoped context without prop
          drilling.
        </li>
        <li>
          <strong>Render props pattern</strong>: Full control over button
          rendering with <code>isSelected</code> state exposed.
        </li>
        <li>
          <strong>Compound component API</strong>:{' '}
          <code>ToggleButtonGroup</code> manages state while{' '}
          <code>ToggleButton</code> renders individual options.
        </li>
      </ul>

      <h2>Exclusive vs Multiple Mode</h2>

      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Exclusive Mode</th>
            <th>Multiple Mode</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Selection</td>
            <td>Only one at a time</td>
            <td>Any combination</td>
          </tr>
          <tr>
            <td>Value type</td>
            <td>
              <code>string | null</code>
            </td>
            <td>
              <code>string[]</code>
            </td>
          </tr>
          <tr>
            <td>Deselection</td>
            <td>Clicking selected deselects</td>
            <td>Toggle each independently</td>
          </tr>
          <tr>
            <td>Use cases</td>
            <td>View modes, alignment, sort</td>
            <td>Formatting, filters, tags</td>
          </tr>
          <tr>
            <td>Similar to</td>
            <td>Radio buttons</td>
            <td>Checkboxes</td>
          </tr>
        </tbody>
      </table>

      <h2>Keyboard Interactions</h2>

      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <kbd>Tab</kbd>
            </td>
            <td>Move focus between toggle buttons</td>
          </tr>
          <tr>
            <td>
              <kbd>Space</kbd> / <kbd>Enter</kbd>
            </td>
            <td>Toggle the focused button&apos;s pressed state</td>
          </tr>
        </tbody>
      </table>

      <h2>Accessibility</h2>

      <ul>
        <li>
          Uses <code>aria-pressed</code> to communicate toggle state to screen
          readers (pressed/not pressed).
        </li>
        <li>
          Each button maintains proper focus indicators and keyboard operability.
        </li>
        <li>
          In exclusive mode, behaves like radio buttons semantically but with
          individual <code>aria-pressed</code> states.
        </li>
        <li>
          Custom styling must maintain sufficient color contrast for both
          pressed and unpressed states.
        </li>
      </ul>

      <h2>Component API</h2>

      <h3>ToggleButtonGroup</h3>

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>exclusive</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>Single selection mode (default: false = multiple)</td>
          </tr>
          <tr>
            <td>
              <code>value</code>
            </td>
            <td>
              <code>string | null | string[]</code>
            </td>
            <td>Controlled value (depends on exclusive prop)</td>
          </tr>
          <tr>
            <td>
              <code>defaultValue</code>
            </td>
            <td>
              <code>string | null | string[]</code>
            </td>
            <td>Initial value for uncontrolled usage</td>
          </tr>
          <tr>
            <td>
              <code>onValueChange</code>
            </td>
            <td>
              <code>(value) =&gt; void</code>
            </td>
            <td>Callback when selection changes</td>
          </tr>
        </tbody>
      </table>

      <h3>ToggleButton</h3>

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>value</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>Unique identifier for this button</td>
          </tr>
          <tr>
            <td>
              <code>children</code>
            </td>
            <td>
              <code>(props, {'{ isSelected }'}) =&gt; ReactNode</code>
            </td>
            <td>Render prop for custom button rendering</td>
          </tr>
        </tbody>
      </table>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
