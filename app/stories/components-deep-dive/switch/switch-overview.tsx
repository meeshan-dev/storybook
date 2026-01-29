import { StoryOverviewWrapper } from '~/components/story-overview-wrapper';

export function SwitchOverview() {
  return (
    <StoryOverviewWrapper>
      <p>
        A switch is a form control that lets users toggle a single option on or
        off.
      </p>

      <h2>Features</h2>

      <ul>
        <li>Built on native HTML input for reliable accessibility</li>
        <li>Represents a clear on/off state</li>
        <li>Customizable on/off icons</li>
        <li>Supports both controlled and uncontrolled usage</li>
      </ul>
    </StoryOverviewWrapper>
  );
}
