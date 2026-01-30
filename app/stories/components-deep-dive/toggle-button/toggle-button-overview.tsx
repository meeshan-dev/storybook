import { StoryOverviewWrapper } from '~/components/story-overview-wrapper';

export function ToggleButtonOverview() {
  return (
    <StoryOverviewWrapper>
      <p>
        The Toggle Button component represents an on/off state and can be used
        individually or as part of a group.
      </p>

      <h2>Features</h2>

      <ul>
        <li>
          <strong>Exclusive</strong>. Only one button can be selected at a time,
          similar to radio buttons.
        </li>
        <li>
          <strong>Multiple</strong>. Multiple buttons can be selected
          simultaneously, similar to checkboxes.
        </li>
        <li>
          Uses <code>aria-pressed</code> to communicate toggle state to
          assistive technologies.
        </li>
        <li>Supports both controlled and uncontrolled state</li>
      </ul>
    </StoryOverviewWrapper>
  );
}
