import { StoryOverviewWrapper } from '~/components/story-overview-wrapper';

export function RadioOverview() {
  return (
    <StoryOverviewWrapper>
      <p>
        A radio button is a form control that lets users select exactly one
        option from a predefined group. It's commonly used when choices are
        mutually exclusive, like selecting a plan or preference.
      </p>

      <h2>Features</h2>

      <ul>
        <li>
          Built on native HTML input elements for reliable browser support
        </li>
        <li>Customizable indicators and styles</li>
        <li>Supports both controlled and uncontrolled usage</li>
      </ul>
    </StoryOverviewWrapper>
  );
}
