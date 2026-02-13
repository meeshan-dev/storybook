import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { MultiConstraintDndDemo } from './multi-constraint-dnd-demo';
import sourceCode from './multi-constraint-dnd-demo?raw';

const meta: Meta = {
  title: 'advanced/Multi-Constraint Drag & Drop',
};

export default meta;

export const Default: StoryObj = {
  name: 'Multi-Constraint Drag & Drop',
  render: () => {
    return (
      <div className='story'>
        <h1>Multi-Constraint Aware Drag & Drop</h1>

        <p>
          A sophisticated drag-and-drop system built with{' '}
          <code>@dnd-kit/core</code> that enforces multiple constraints on where
          items can be dropped. This demonstrates real-world scenarios where
          items have properties and drop zones have rules that must be
          satisfied.
        </p>

        <h2>Interactive Demo</h2>

        <p>
          Try dragging items from the available pool into different zones.
          Notice how the zones change color based on whether the item can be
          dropped:
        </p>

        <hr />

        <MultiConstraintDndDemo />

        <hr />

        <h2>Features</h2>

        <ul>
          <li>
            <strong>Multiple Drop Zone Constraints:</strong> Each zone enforces
            different rules (type restrictions, priority requirements, tag
            matching, capacity limits)
          </li>
          <li>
            <strong>Visual Feedback System:</strong> Zones dynamically change
            border color (green for valid, red for invalid) based on drag item
            compatibility
          </li>
          <li>
            <strong>Capacity Management:</strong> Zones can limit the maximum
            number of items they hold (e.g., 3 items max, 4 items max)
          </li>
          <li>
            <strong>Unrestricted Zone:</strong> One zone accepts any item
            without constraints for flexible organization
          </li>
          <li>
            <strong>Drag Activation Threshold:</strong> 8px distance required
            before drag starts, preventing accidental drags
          </li>
          <li>
            <strong>Drag Overlay:</strong> Visual preview of the dragged item
            follows the cursor
          </li>
        </ul>

        <StorySourceCode>{sourceCode}</StorySourceCode>
      </div>
    );
  },
};
