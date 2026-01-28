import { StoryOverviewWrapper } from '~/components/story-overview-wrapper';

export function CheckboxOverview() {
  return (
    <StoryOverviewWrapper>
      <p>
        A checkbox is a simple form control that lets users select one or more
        options from a group. It’s commonly used for settings, preferences, and
        multi-select lists.
      </p>

      <h2>Features</h2>

      <ul>
        <li>
          Built on native HTML input elements for broad browser compatibility
        </li>
        <li>Supports an indeterminate state for partial or mixed selections</li>
        <li>Customizable icons</li>
        <li>Fully controllable and uncontrolled usage</li>
      </ul>
    </StoryOverviewWrapper>
  );
}
