import type { Decorator } from '@storybook/react-vite';
import { twMerge } from 'tailwind-merge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';

export function breadcrumbsDecorator({
  className,
}: {
  className?: string;
} = {}): Decorator {
  return function (Story, { name, title, id }) {
    return (
      <div
        className={twMerge('flex flex-col gap-5 overflow-auto p-5', className)}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/?path=/story/${id.split('--')[0]}`}>
                {title.replace('Production/', '')}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>{name}</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Story />
      </div>
    );
  };
}
