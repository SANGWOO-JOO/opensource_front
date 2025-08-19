import React from 'react';
import clsx from 'clsx';

interface ChipProps {
  children: React.ReactNode;
  selected?: boolean;
  selectable?: boolean;
  onClick?: () => void;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({
  children,
  selected = false,
  selectable = false,
  onClick,
  className
}) => {
  return (
    <button
      className={clsx(
        'chip',
        selectable && 'chip--selectable',
        selected && 'chip--selected',
        !selectable && !onClick && 'cursor-default',
        className
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default Chip;