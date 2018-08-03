import numberInput from './number-input';

export interface ViewBoxDimensionProps {
  collapsed: number;
  expanded: number;
}

export function ViewBoxDimension({
  collapsed,
  expanded
}: ViewBoxDimensionProps): ViewBoxDimensionProps {
  return {
    collapsed,
    expanded
  };
}
