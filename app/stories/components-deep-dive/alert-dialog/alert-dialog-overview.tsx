import { StoryOverviewWrapper } from '~/components/story-overview-wrapper';

export function AlertDialogOverview() {
  return (
    <StoryOverviewWrapper>
      <p>
        An alert dialog is a modal window that requires users to acknowledge a
        message before they can proceed. It is typically used for critical
        information, warnings, or actions that may have significant
        consequences, such as deleting data or confirming irreversible actions.
      </p>

      <h2>Key Features:</h2>
      <ul>
        <li>
          <strong>Modal Behavior:</strong> Alert dialogs are modal, meaning they
          block interaction with the rest of the application until the user
          responds.
        </li>
        <li>
          <strong>Focus Management:</strong> When an alert dialog opens, focus
          is automatically moved to the dialog, and when it closes, focus
          returns to the element that triggered it.
        </li>
        <li>
          <strong>Accessibility:</strong> Alert dialogs are designed to be
          accessible, ensuring that screen readers can announce the dialog's
          content and purpose effectively.
        </li>
        <li>
          <strong>Customizable Content:</strong> Developers can customize the
          title, description, and action buttons within the alert dialog to suit
          their application's needs.
        </li>
      </ul>

      <h2>Common Use Cases:</h2>
      <ul>
        <li>Confirming destructive actions (e.g., deleting an item).</li>
        <li>Displaying critical warnings or error messages.</li>
        <li>Requesting user confirmation for important decisions.</li>
      </ul>
    </StoryOverviewWrapper>
  );
}
