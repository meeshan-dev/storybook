import { StoryOverviewWrapper } from '~/components/story-overview-wrapper';

export function PopoverOverview() {
  return (
    <StoryOverviewWrapper>
      <p>
        The Popover component displays contextual content anchored to a trigger
        element. It is commonly used for supplemental information, lightweight
        actions, or small forms that don't require full page focus.
      </p>

      <h2>Features</h2>

      <ul>
        <li>
          Fully accessible, with proper ARIA roles, labels, and descriptions.
        </li>
        <li>
          Opens relative to its trigger and automatically adjusts placement to
          remain visible
        </li>
        <li>Supports controlled and uncontrolled open state.</li>
        <li>Moves focus into the popover when opened</li>
        <li>Restores focus to the trigger when closed</li>
        <li>Closes on outside click, Escape key, or explicit close actions.</li>
        <li>
          Layer-aware behavior ensures only the topmost layer responds to
          interactions.
        </li>
        <li>
          Portal-based rendering for correct stacking and layout isolation.
        </li>
      </ul>
    </StoryOverviewWrapper>
  );
}
