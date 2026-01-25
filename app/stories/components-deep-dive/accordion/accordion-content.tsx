import { useAccordionItemCtx } from './accordion-item';

export const AccordionContent = (props: React.ComponentPropsWithRef<'div'>) => {
  const { ...restProps } = props;

  const itemCtx = useAccordionItemCtx();

  return !itemCtx.isExpended ? null : (
    <div
      {...restProps}
      id={itemCtx.contentId}
      className='overflow-hidden text-sm'
    />
  );
};
