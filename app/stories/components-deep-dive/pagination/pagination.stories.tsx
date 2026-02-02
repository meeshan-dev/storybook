import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { PaginationDemo } from './pagination-demo';
import sourceCode from './pagination?raw';

const meta: Meta = {
  title: 'components-deep-dive/Pagination',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Pagination',
  render: () => (
    <div className='story typography'>
      <h1>Pagination</h1>

      <p>
        The Pagination component is a versatile and customizable solution for
        navigating through large sets of data divided into discrete pages. It
        provides users with intuitive controls to move between pages, jump to
        the first or last page, and view a range of page numbers with ellipses
        for better context.
      </p>

      <div className='story-demo not-typography'>
        <h2>Demo</h2>
        <p>Full pagination with first, previous, next, and last controls.</p>
        <div>
          <PaginationDemo />
        </div>
      </div>

      <h2>Features</h2>

      <ul>
        <li>Boundary and sibling page support with automatic ellipsis.</li>
        <li>Headless, fully customizable rendering.</li>
        <li>Controlled and uncontrolled page state.</li>
        <li>Compound components with shared pagination context.</li>
        <li>Predictable output for large and small page counts.</li>
        <li>Semantic list structure with flexible controls.</li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
