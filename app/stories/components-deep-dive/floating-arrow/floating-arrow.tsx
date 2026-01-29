import { type Coords, type Placement, type Side } from '@floating-ui/react-dom';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface FloatingArrowProps extends Partial<Coords> {
  placement: Placement;
  centerOffset?: number;
  alignmentOffset?: number;
  setFloatingArrow: React.Dispatch<
    React.SetStateAction<HTMLElement | SVGSVGElement | null>
  >;
  className?: string;
  /** size of default arrow in px
   * @default 5
   */
  size?: number;
  children?: (
    props: {
      style: React.CSSProperties;
      side: Side;
      isInCenter: boolean;
    } & React.RefAttributes<HTMLElement | SVGSVGElement>,
  ) => React.ReactNode;
}

export const FloatingArrow = (props: FloatingArrowProps) => {
  const {
    children,
    className,
    size = 5,
    placement,
    setFloatingArrow,
    centerOffset,
    x,
    y,
  } = props;

  const side = (placement.split('-')[0] as Side) ?? '';

  const style: React.CSSProperties = {
    position: 'absolute',
    top: (side === 'top' && '100%') || (y !== undefined ? `${y}px` : ''),
    bottom: side === 'bottom' ? '100%' : '',
    left: (side === 'left' && '100%') || (x !== undefined ? `${x}px` : ''),
    right: side === 'right' ? '100%' : '',
    rotate:
      (side === 'top' && '180deg') ||
      (side === 'bottom' && '0deg') ||
      (side === 'left' && '90deg') ||
      (side === 'right' && '-90deg') ||
      'none', // none is only to satisfy ts
  };

  const isInCenter = centerOffset !== undefined ? centerOffset !== 0 : false;

  if (!children) {
    return (
      <div
        data-hide={isInCenter}
        style={{ ...style, ...{ '--arrow-size': `${size}px` } }}
        ref={setFloatingArrow}
        className={twMerge(
          'border-foreground border-(length:--arrow-size) border-t-transparent border-r-transparent border-l-transparent data-[hide=true]:hidden',
          className,
        )}
      />
    );
  }

  if (typeof children !== 'function')
    throw new Error(`FloatingArrow: \`children\` must be type of \`function\``);

  return (
    <>
      {children({
        ref: setFloatingArrow,
        style,
        side,
        isInCenter,
      })}
    </>
  );
};
