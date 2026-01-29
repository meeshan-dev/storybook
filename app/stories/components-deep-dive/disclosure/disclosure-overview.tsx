import { StoryOverviewWrapper } from '~/components/story-overview-wrapper';

export function DisclosureOverview() {
  return (
    <StoryOverviewWrapper>
      <p>
        The Disclosure component is fully accessible and follows the WAI-ARIA
        Authoring Practices. It supports keyboard navigation and screen readers
        to deliver an inclusive user experience.
      </p>

      <h2>Features</h2>

      <ul>
        <li>Supports both single and multiple item open modes.</li>
        <li>Individual items can be configured to be non-collapsible.</li>
        <li>
          Smooth open and close animations powered by <code>motion/react</code>.
        </li>
        <li>
          State management with support for externally controlled open and
          closed states.
        </li>
      </ul>

      <p>
        Learn more about the W3C disclosure pattern{' '}
        <a href='https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/'>here</a>.
      </p>
    </StoryOverviewWrapper>
  );
}
