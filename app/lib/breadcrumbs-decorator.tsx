import type { Decorator } from '@storybook/react-vite';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';

export function breadcrumbsDecorator(): Decorator {
  return function (Story, { name, title, id }) {
    return (
      <div className='flex min-h-dvh flex-col gap-5 p-5'>
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
