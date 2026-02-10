import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import sourceCode from './mini-react.ts?raw';

const meta: Meta = {
  title: 'advanced/Mini React',
};

export default meta;

export const Default: StoryObj = {
  name: 'Mini React',
  render: () => {
    return (
      <div className='story'>
        <h1>Mini React</h1>

        <p>
          I used <a href='https://pomb.us/build-your-own-react/'>this guide</a>{' '}
          as a reference, but the goal wasn't to copy it. I reimplemented the
          ideas step by step to deeply understand Fiber, reconciliation, and
          hooks, and I can explain the reasoning and tradeoffs behind each part.
        </p>

        <p>
          This is a simplified React implementation that covers the core
          concepts:
        </p>

        <ul>
          <li>Virtual DOM (createElement)</li>
          <li>Fiber Architecture</li>
          <li>Reconciliation (Diffing)</li>
          <li>Hooks (useState, useEffect, useRef, useMemo, useCallback)</li>
        </ul>

        <h2>KEY CONCEPTS:</h2>

        <ul>
          <li>
            VIRTUAL DOM
            <ul>
              <li>JavaScript representation of the DOM</li>
              <li>Cheaper to manipulate than real DOM</li>
              <li>Enables declarative UI updates</li>
            </ul>
          </li>

          <li>
            RECONCILIATION (Diffing)
            <ul>
              <li>Compares old vs new virtual DOM trees</li>
              <li>Does not handle keys in this simplified version</li>
            </ul>
          </li>

          <li>
            FIBER ARCHITECTURE
            <ul>
              <li>Each fiber = unit of work</li>
              <li>
                Allows work to be paused and resumed (time-sliced rendering)
              </li>
              <li>Tree structure with child, sibling, parent links</li>
            </ul>
          </li>

          <li>
            TWO PHASES
            <ul>
              <li>
                Render phase: Build fiber tree, determine changes
                (interruptible)
              </li>
              <li>Commit phase: Apply changes to DOM (not interruptible)</li>
            </ul>
          </li>

          <li>
            HOOKS
            <ul>
              <li>Stored in Fiber linked list per component</li>
              <li>Order must be consistent (no conditional hooks)</li>
              <li>useState: triggers re-render on state change</li>
              <li>useEffect: side effects after render</li>
              <li>useRef: mutable value without re-render</li>
              <li>useMemo/useCallback: memoization</li>
            </ul>
          </li>

          <li>
            BATCHING
            <ul>
              <li>Multiple setState calls are batched</li>
              <li>Only one re-render per batch</li>
            </ul>
          </li>
        </ul>

        <StorySourceCode>{sourceCode}</StorySourceCode>
      </div>
    );
  },
};
