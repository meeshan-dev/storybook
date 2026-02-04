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
        A headless pagination component with smart page range calculation and
        ellipsis handling. Implements boundary and sibling page algorithms for
        optimal UX.
      </p>

      <div className='story-demo not-typography'>
        <h2>Interactive Examples</h2>
        <p className='text-muted-foreground mb-6'>
          Data table, gallery, compact, and simple pagination styles
        </p>
        <div>
          <PaginationDemo />
        </div>
      </div>

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          <strong>Smart page calculation</strong> — Uses boundary and sibling
          counts to compute visible pages with proper ellipsis placement
        </li>
        <li>
          <strong>Memoized computation</strong> — Page range calculation
          memoized to prevent unnecessary recalculation
        </li>
        <li>
          Uses semantic <code>&lt;ul&gt;</code>/<code>&lt;li&gt;</code>{' '}
          structure
        </li>
        <li>Controls are properly disabled at boundaries</li>
        <li>
          Current page indicated via <code>aria-current="page"</code> and{' '}
          <code>data-selected</code> for styling
        </li>
      </ul>

      <h2>Page Range Algorithm</h2>

      <p>
        The pagination displays pages based on <code>boundaryCount</code> (pages
        at start/end) and <code>siblingCount</code> (pages around current).
        Ellipsis appears when there are gaps in the sequence.
      </p>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='py-2 pr-4 text-left font-semibold'>Config</th>
              <th className='py-2 pr-4 text-left font-semibold'>Current: 5</th>
              <th className='py-2 text-left font-semibold'>Display</th>
            </tr>
          </thead>
          <tbody className='text-muted-foreground'>
            <tr className='border-b'>
              <td className='py-2 pr-4'>boundary=1, sibling=1</td>
              <td className='py-2 pr-4'>Page 5 of 20</td>
              <td className='py-2'>1 ... 4 5 6 ... 20</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>boundary=2, sibling=1</td>
              <td className='py-2 pr-4'>Page 5 of 20</td>
              <td className='py-2'>1 2 ... 4 5 6 ... 19 20</td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>boundary=1, sibling=2</td>
              <td className='py-2 pr-4'>Page 5 of 20</td>
              <td className='py-2'>1 ... 3 4 5 6 7 ... 20</td>
            </tr>
          </tbody>
        </table>
      </div>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
