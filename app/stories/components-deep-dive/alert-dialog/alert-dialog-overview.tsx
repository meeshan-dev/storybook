import { StoryOverviewWrapper } from '~/components/story-overview-wrapper';

export function AlertDialogOverview() {
  return (
    <StoryOverviewWrapper>
      <p>
        An Alert Dialog is a modal dialog that interrupts the user's workflow to
        communicate a critical message and require an explicit response.
      </p>

      <h2>Features</h2>

      <ul>
        <li>
          Fully accessible, with proper ARIA roles, labels, and descriptions.
        </li>
        <li>
          Focus is trapped within the alert dialog while open and restored on
          close.
        </li>
        <li>Supports controlled and uncontrolled open state.</li>
        <li>Closes on Escape key, or explicit close actions.</li>
        <li>Scroll locking prevents background content from scrolling.</li>
        <li>
          Layer-aware behavior ensures only the topmost alert dialog responds to
          interactions.
        </li>
        <li>
          Portal-based rendering for correct stacking and layout isolation.
        </li>
      </ul>
    </StoryOverviewWrapper>
  );
}
