import { StoryOverviewWrapper } from '~/components/story-overview-wrapper';

export function ComboboxOverview() {
  return (
    <StoryOverviewWrapper>
      <p>
        A fully accessible combobox built from first principles, designed to
        handle complex interaction patterns without relying on heavy
        abstractions.
      </p>

      <h2>Features</h2>

      <ul>
        <li>Single and multiple selection support with removable tags</li>
        <li>Full keyboard navigation and screen reader compatibility</li>
        <li>Search with diacritics-insensitive filtering</li>
        <li>
          Precise focus and highlight management for input, listbox, and tags
        </li>
        <li>Floating, auto-positioned listbox with dynamic sizing</li>
        <li>Disabled option handling and robust edge-case coverage</li>
      </ul>
    </StoryOverviewWrapper>
  );
}
