import { StoryOverviewWrapper } from '~/components/story-overview-wrapper';

export function MenuOverview() {
  return (
    <StoryOverviewWrapper>
      <p>
        A production-grade, accessible Menu component built for complex overlay
        systems and real keyboard interaction.
      </p>

      <h2>Features</h2>

      <ul>
        <li>WAI-ARIA compliant menu, checkbox, and radio patterns</li>
        <li>
          DOM-driven roving tabindex for zero re-renders during navigation
        </li>
        <li>Full keyboard support including arrows, typeahead, and looping</li>
        <li>Correct focus restoration to trigger on close</li>
        <li>
          Floating UI positioning with collision handling and arrow support
        </li>
        <li>Layer-aware escape handling for nested overlays</li>
        <li>Click-outside dismissal with portal support</li>
        <li>Scroll locking while menu is open</li>
        <li>Composable primitives: items, groups, separators, radio groups</li>
      </ul>
    </StoryOverviewWrapper>
  );
}
