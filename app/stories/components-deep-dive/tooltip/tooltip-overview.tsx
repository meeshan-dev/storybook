import { StoryOverviewWrapper } from '~/components/story-overview-wrapper';

export function TooltipOverview() {
  return (
    <StoryOverviewWrapper>
      <p>
        The Tooltip component displays contextual information when users hover
        or focus an element. It is designed to be lightweight, accessible, and
        predictable across mouse and keyboard interactions.
      </p>

      <h2>Features</h2>

      <ul>
        <li>Supports hover, focus, or combined triggers</li>
        <li>Keyboard accessible with Escape key dismissal</li>
        <li>Configurable show and hide delays</li>
        <li>Interactive tooltips that remain open on hover</li>
        <li>Automatic positioning with collision handling</li>
        <li>Single-tooltip visibility to prevent overlap</li>
        <li>Disabled state support</li>
      </ul>

      <h2>Accessibility</h2>

      <ul>
        <li>
          Uses <code>role="tooltip"</code> for assistive technologies
        </li>
        <li>Opens on keyboard focus by default</li>
        <li>Closes on Escape key</li>
        <li>Does not trap focus</li>
      </ul>

      <h2>Positioning</h2>

      <ul>
        <li>Automatic placement and flipping</li>
        <li>Viewport-aware shifting</li>
        <li>Arrow positioning with configurable padding</li>
        <li>Auto-updates on scroll and resize</li>
      </ul>
    </StoryOverviewWrapper>
  );
}
