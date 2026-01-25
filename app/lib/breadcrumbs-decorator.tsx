import type { Decorator } from '@storybook/react-vite';
import { Fragment } from 'react/jsx-runtime';
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
  return function (Story, { name, title }) {
    const breadcrumbs = title.split('/');

    return (
      <div className={twMerge('flex flex-col gap-5 p-5', className)}>
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, idx) => (
              <Fragment key={item}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/?path=/story/${breadcrumbs
                      .slice(0, idx + 1)
                      .join('-')
                      .toLowerCase()
                      .replaceAll(' ', '-')}`}
                    className='first-letter:uppercase'
                  >
                    {item.replaceAll('-', ' ')}
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />
              </Fragment>
            ))}

            <BreadcrumbItem>{name}</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Story />
      </div>
    );
  };
}
