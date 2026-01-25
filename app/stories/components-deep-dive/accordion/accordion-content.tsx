import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react';
import { twMerge } from 'tailwind-merge';
import { mergeMotionProp } from '~/lib/merge-motion-prop';
import { useAccordionItemCtx } from './accordion-item';

const default_initial = { height: 0, opacity: 0, overflow: 'hidden' };
const default_animate = { height: 'auto', opacity: 1, overflow: 'hidden' };
const default_exit = { height: 0, opacity: 0, overflow: 'hidden' };
const default_transition = { duration: 0.2 };

export const AccordionContent = (
  props: Omit<React.ComponentPropsWithRef<'div'>, 'id'> & {
    motionProps?: Omit<HTMLMotionProps<'div'>, 'children'>;
  },
) => {
  const {
    className,
    motionProps: { initial, animate, exit, transition, ...motionProps } = {},
    ...restProps
  } = props;

  const itemCtx = useAccordionItemCtx();

  return (
    <AnimatePresence>
      {!itemCtx.isExpended ? null : (
        <motion.div
          {...motionProps}
          initial={mergeMotionProp(initial, default_initial)}
          animate={mergeMotionProp(animate, default_animate)}
          exit={mergeMotionProp(exit, default_exit)}
          transition={mergeMotionProp(transition, default_transition)}
        >
          <div
            {...restProps}
            id={itemCtx.contentId}
            className={twMerge(
              '[&_a]:hover:text-foreground overflow-hidden px-3 pt-0 pb-4 text-sm [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4',
              className,
            )}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
