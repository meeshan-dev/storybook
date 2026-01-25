import { useAccordionItemCtx } from './accordion-item';

export const AccordionHeader = (props: React.ComponentPropsWithRef<'div'>) => {
  const { ...restProps } = props;

  const itemCtx = useAccordionItemCtx();

  return <h3 {...restProps} data-expanded={itemCtx.isExpended} />;
};
