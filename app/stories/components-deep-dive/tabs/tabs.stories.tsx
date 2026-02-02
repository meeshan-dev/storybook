import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { TabsDemo } from './tabs-demo';
import sourceCode from './tabs?raw';

const meta: Meta = {
  title: 'components-deep-dive/Tabs',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Tabs',
  render: () => (
    <div className='story typography'>
      <h1>Tabs</h1>

      <p>
        Tabs organize related content into separate views, allowing users to
        switch between sections without leaving the current page. Only one tab
        panel is visible at a time, keeping the interface focused and easy to
        scan.
      </p>

      <div className='story-demo not-typography'>
        <h2>Demo</h2>
        <p>
          Automatic activation with loop, manual activation, and vertical
          orientation.
        </p>
        <div>
          <TabsDemo />
        </div>
      </div>

      <h2>Features</h2>

      <ul>
        <li>
          Fully accessible and aligned with WAI-ARIA Authoring Practices for
          tabs.
        </li>
        <li>
          Supports controlled and uncontrolled state for flexible data flow.
        </li>
        <li>
          Automatic and manual activation modes for different keyboard
          interaction needs.
        </li>
        <li>
          Horizontal and vertical orientations with full keyboard navigation.
        </li>
        <li>Optional looping behavior when navigating with arrow keys.</li>
        <li>
          Roving <code>tabIndex</code> management for predictable focus
          behavior.
        </li>
        <li>
          Render-prop based triggers for complete control over markup and
          styling.
        </li>
      </ul>

      <p>
        For more details, see the official W3C Tabs pattern{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/tabs/'
          target='_blank'
        >
          documentation
        </a>
        .
      </p>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
