import { StoryOverviewWrapper } from '~/components/story-overview-wrapper';

export function AccordionOverview() {
  return (
    <StoryOverviewWrapper>
      <p>
        The Accordion component is fully accessible and follows the WAI-ARIA
        Authoring Practices. It supports keyboard navigation, screen readers to
        deliver an inclusive user experience.
      </p>

      <h2>Features</h2>

      <ul>
        <li>Supports both single and multiple item expansion modes.</li>
        <li>Individual items can be configured to be non-collapsible.</li>
        <li>
          Fully keyboard accessible, including <code>Up/Down</code> arrow keys,{' '}
          <code>Home/End</code> keys, and <code>Tab</code> navigation.
        </li>
        <li>
          Smooth open and close animations powered by <code>motion/react</code>.
        </li>
        <li>
          Built-in state management with support for externally controlled open
          and closed states.
        </li>
      </ul>

      <p>
        Learn more about the W3C accordion pattern{' '}
        <a href='https://www.w3.org/WAI/ARIA/apg/patterns/accordion/'>here</a>.
      </p>
    </StoryOverviewWrapper>
  );
}
