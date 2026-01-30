import { StoryOverviewWrapper } from '~/components/story-overview-wrapper';

export function PaginationOverview() {
  return (
    <StoryOverviewWrapper>
      <p>
        The Pagination component is a versatile and customizable solution for
        navigating through large sets of data divided into discrete pages. It
        provides users with intuitive controls to move between pages, jump to
        the first or last page, and view a range of page numbers with ellipses
        for better context.
      </p>

      <h2>Features</h2>

      <ul>
        <li>Boundary and sibling page support with automatic ellipsis</li>
        <li>Headless, fully customizable rendering</li>
        <li>Controlled and uncontrolled page state</li>
        <li>Compound components with shared pagination context</li>
        <li>Predictable output for large and small page counts</li>
        <li>Semantic list structure with flexible controls</li>
      </ul>
    </StoryOverviewWrapper>
  );
}
