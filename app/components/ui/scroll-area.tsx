import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';

import { cn } from '~/lib/utils';

function ScrollArea({
  className,
  children,
  scrollbarClassName,
  thumbClassName,
  viewportRef,
  ...props
}: ScrollAreaPrimitive.Root.Props &
  React.RefAttributes<HTMLDivElement> & {
    viewportRef?: React.Ref<HTMLDivElement>;
    scrollbarClassName?: string;
    thumbClassName?: string;
  }) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot='scroll-area'
      className={cn('relative', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        data-slot='scroll-area-viewport'
        className='focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1'
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar
        className={scrollbarClassName}
        thumbClassName={thumbClassName}
      />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = 'vertical',
  thumbClassName,
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props & {
  thumbClassName?: string;
}) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot='scroll-area-scrollbar'
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        'flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot='scroll-area-thumb'
        className={cn('bg-border relative flex-1 rounded-full', thumbClassName)}
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollArea, ScrollBar };
