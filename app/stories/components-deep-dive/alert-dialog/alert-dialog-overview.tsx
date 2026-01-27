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
          Prevents interaction with the rest of the application until the alert
          dialog is dismissed.
        </li>
        <li>
          Automatically moves focus into the dialog when it opens and restores
          focus to the trigger element when it closes.
        </li>
        <li>
          Fully accessible, with proper announcements of the dialog's title and
          description for screen reader users.
        </li>
      </ul>
    </StoryOverviewWrapper>
  );
}
