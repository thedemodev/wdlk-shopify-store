import numberInput from './number-input';

export interface ViewBoxDimensionProps {
  collapsed: {
    width: number;
    height: number;
  };
  expanded: {
    width?: number;
    height: number;
  };
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
