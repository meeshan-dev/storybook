import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { UseScrollLockDemo } from './use-scroll-lock-demo';
import sourceCode from './use-scroll-lock?raw';

const meta: Meta = {
  title: 'hooks/use Scroll Lock',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'use Scroll Lock',
  render: () => (
    <div className='story'>
      <h1>use Scroll Lock</h1>

      <p>
        Prevents scrolling on a target element (defaults to{' '}
        <code>document.body</code>) while maintaining layout stability by adding
        equivalent <code>paddingRight</code> / <code>paddingBottom</code> for
        the removed scrollbar <code>width</code> / <code>height</code>.
      </p>

      <h2>Interactive demo</h2>

      <p>
        Toggle the lock and try scrolling — the scrollbar disappears without
        layout shift
      </p>

      <hr />

      <UseScrollLockDemo />

      <hr />

      <h2>Implementation Highlights</h2>

      <ul>
        <li>
          Supports locking in three directions: <code>&quot;both&quot;</code>,{' '}
          <code>&quot;vertical&quot;</code>, and{' '}
          <code>&quot;horizontal&quot;</code>
        </li>
        <li>
          Remove scrollbar by adding equivalent <code>paddingRight</code> /{' '}
          <code>paddingBottom</code> to prevent layout shift
        </li>
        <li>
          Reference counted lock manager allows <strong>nested locks</strong> on
          the same element, only the last unlock restores original styles
        </li>
        <li>
          Configurable target element via <code>getElement</code> — works on{' '}
          <code>body</code>, modals, or any scrollable container
        </li>
      </ul>

      <StorySourceCode>{sourceCode}</StorySourceCode>
    </div>
  ),
};
