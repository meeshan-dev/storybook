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
        A headless pagination component with smart page range calculation,
        ellipsis handling, and render prop pattern for full styling control.
        Implements boundary and sibling page algorithms for optimal UX.
      </p>

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          <strong>Smart page calculation</strong> — Uses boundary and sibling
          counts to compute visible pages with proper ellipsis placement
        </li>
        <li>
          <strong>Compound component pattern</strong> —{' '}
          <code>PaginationRoot</code>, <code>PaginationPages</code>, and{' '}
          <code>PaginationControl</code> share context
        </li>
        <li>
          <strong>Render prop flexibility</strong> — Full control over button
          rendering with type, page, and selected state
        </li>
        <li>
          <strong>Semantic HTML</strong> — Renders as a <code>&lt;ul&gt;</code>{' '}
          list with proper <code>&lt;li&gt;</code> items
        </li>
        <li>
          <strong>Memoized computation</strong> — Page range calculation
          memoized to prevent unnecessary recalculation
        </li>
      </ul>

      <div className='story-demo not-typography'>
        <h2>Interactive Examples</h2>
        <p className='text-muted-foreground mb-6'>
          Data table, gallery, compact, and simple pagination styles
        </p>
        <div>
          <PaginationDemo />
        </div>
      </div>

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

      <h2>Props Reference</h2>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='py-2 pr-4 text-left font-semibold'>Prop</th>
              <th className='py-2 pr-4 text-left font-semibold'>Type</th>
              <th className='py-2 text-left font-semibold'>Description</th>
            </tr>
          </thead>
          <tbody className='text-muted-foreground'>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>totalPages</code>
              </td>
              <td className='py-2 pr-4'>number</td>
              <td className='py-2'>Total number of pages</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>defaultPage</code>
              </td>
              <td className='py-2 pr-4'>number</td>
              <td className='py-2'>Initial page (default: 1)</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>boundaryCount</code>
              </td>
              <td className='py-2 pr-4'>number</td>
              <td className='py-2'>Pages shown at start/end (default: 1)</td>
            </tr>
            <tr className='border-b'>
              <td className='py-2 pr-4'>
                <code>siblingCount</code>
              </td>
              <td className='py-2 pr-4'>number</td>
              <td className='py-2'>Pages around current (default: 1)</td>
            </tr>
            <tr>
              <td className='py-2 pr-4'>
                <code>disabled</code>
              </td>
              <td className='py-2 pr-4'>boolean</td>
              <td className='py-2'>Disable all controls</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Control Types</h2>

      <ul>
        <li>
          <code>first</code> — Jump to first page
        </li>
        <li>
          <code>previous</code> — Go to previous page
        </li>
        <li>
          <code>next</code> — Go to next page
        </li>
        <li>
          <code>last</code> — Jump to last page
        </li>
      </ul>

      <h2>Accessibility Considerations</h2>

      <ul>
        <li>
          Uses semantic <code>&lt;ul&gt;</code>/<code>&lt;li&gt;</code>{' '}
          structure
        </li>
        <li>Controls are properly disabled at boundaries</li>
        <li>
          Current page indicated via <code>data-selected</code> for styling
        </li>
        <li>
          Consider adding <code>aria-label="Pagination"</code> to root
        </li>
        <li>
          Consider <code>aria-current="page"</code> for current page button
        </li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
