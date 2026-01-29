import { StoryOverviewWrapper } from '~/components/story-overview-wrapper';

export function DialogOverview() {
  return (
    <StoryOverviewWrapper>
      <p>
        A Dialog is a modal surface that appears above the page content to
        present critical information or request user input. It temporarily
        blocks interaction with the underlying UI until the dialog is dismissed.
      </p>

      <h2>Features</h2>

      <ul>
        <li>
          Fully accessible, with proper ARIA roles, labels, and descriptions.
        </li>
        <li>
          Focus is trapped within the dialog while open and restored on close.
        </li>
        <li>Supports controlled and uncontrolled open state.</li>
        <li>Closes on outside click, Escape key, or explicit close actions.</li>
        <li>Scroll locking prevents background content from scrolling.</li>
        <li>
          Layer-aware behavior ensures only the topmost dialog responds to
          interactions.
        </li>
        <li>
          Portal-based rendering for correct stacking and layout isolation.
        </li>
      </ul>
    </StoryOverviewWrapper>
  );
}
