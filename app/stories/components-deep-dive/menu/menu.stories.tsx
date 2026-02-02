import type { Meta, StoryObj } from '@storybook/react-vite';
import { StorySourceCode } from '~/components/story-source-code';
import { MenuDemo } from './menu-demo';
import sourceCode from './menu?raw';

const meta: Meta = {
  title: 'components-deep-dive/Menu',
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Menu',
  render: () => (
    <div className='story typography'>
      <h1>Menu</h1>

      <p>
        A production-grade, accessible Menu component built for complex overlay
        systems and real keyboard interaction.
      </p>

      <div className='story-demo not-typography'>
        <h2>Demo</h2>
        <p>Basic menu, checkbox items, radio items, and grouped items.</p>
        <div>
          <MenuDemo />
        </div>
      </div>

      <h2>Features</h2>

      <ul>
        <li>WAI-ARIA compliant menu, checkbox, and radio patterns.</li>
        <li>
          DOM-driven roving tabindex for zero re-renders during navigation.
        </li>
        <li>Full keyboard support including arrows, typeahead, and looping.</li>
        <li>Correct focus restoration to trigger on close.</li>
        <li>
          Floating UI positioning with collision handling and arrow support.
        </li>
        <li>Layer-aware escape handling for nested overlays.</li>
        <li>Click-outside dismissal with portal support.</li>
        <li>Scroll locking while menu is open.</li>
        <li>Composable primitives: items, groups, separators, radio groups.</li>
      </ul>

      <p>
        For more details, see the official W3C Menu pattern{' '}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/menu/'
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
