import { StoryOverviewWrapper } from '~/components/story-overview-wrapper';

export function RadioOverview() {
  return (
    <StoryOverviewWrapper>
      <p>
        A radio button is a form control that allows users to select exactly one
        option from a group.
      </p>

      <h2>Features</h2>

      <ul>
        <li>Built on native HTML input for reliable browser behavior</li>
        <li>Grouped by name to ensure a single selected value</li>
        <li>Customizable indicators and visual styles</li>
        <li>Supports both controlled and uncontrolled usage</li>
      </ul>
    </StoryOverviewWrapper>
  );
}
