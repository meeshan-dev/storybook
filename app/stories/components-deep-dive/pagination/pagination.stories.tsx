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
    <div className='story'>
      <h1>Pagination</h1>

      <p>
        Implements the{' '}
        <a
          href='https://design-system.w3.org/components/pagination.html'
          target='_blank'
        >
          W3C Pagination Component
        </a>
      </p>

      <h2>Interactive demo</h2>

      <p>Data table, gallery, compact, and simple pagination styles</p>

      <hr />

      <PaginationDemo />

      <hr />

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          <strong>Smart page calculation</strong> — Computes visible pages with
          proper ellipsis using boundary and sibling counts
        </li>
        <li>
          <strong>Memoized computation</strong> — Prevents unnecessary
          recalculation of page ranges
        </li>
        <li>
          Semantic <code>&lt;ul&gt;/&lt;li&gt;</code> structure for
          accessibility
        </li>
        <li>
          Boundary-aware controls — Disabled appropriately at first and last
          pages
        </li>
        <li>
          Current page indicated with <code>aria-current="page"</code> and{' '}
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
