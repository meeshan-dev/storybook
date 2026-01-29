import { StoryOverviewWrapper } from '~/components/story-overview-wrapper';

export function TabsOverview() {
  return (
    <StoryOverviewWrapper>
      <p>
        Tabs organize related content into separate views, allowing users to
        switch between sections without leaving the current page. Only one tab
        panel is visible at a time, keeping the interface focused and easy to
        scan.
      </p>

      <h2>Features</h2>

      <ul>
        <li>
          Fully accessible and aligned with WAI-ARIA Authoring Practices for
          tabs.
        </li>
        <li>
          Supports controlled and uncontrolled state for flexible data flow.
        </li>
        <li>
          Automatic and manual activation modes for different keyboard
          interaction needs.
        </li>
        <li>
          Horizontal and vertical orientations with full keyboard navigation.
        </li>
        <li>Optional looping behavior when navigating with arrow keys.</li>
        <li>
          Roving <code>tabIndex</code> management for predictable focus
          behavior.
        </li>
        <li>
          Render-prop based triggers for complete control over markup and
          styling.
        </li>
      </ul>
    </StoryOverviewWrapper>
  );
}
