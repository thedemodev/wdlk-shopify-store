export interface DimensionProps {
  startWidth: number;
  endWidth: number;
  startHeight: number;
  endHeight: number;
}

export interface CurrentDimensionProps {
  width: number;
  height: number;
}

type cbType = (n: CurrentDimensionProps) => {};

export function easeValues(dimension: DimensionProps): (d: number) => {} {
  return (duration: number) => (cb: cbType) => {
    const { startWidth, endWidth, startHeight, endHeight } = dimension;
    const deltaW = (endWidth - startWidth) / duration;
    const deltaH = (endHeight - startHeight) / duration;
    const currentDimension = {
      width: startWidth,
      height: startHeight
    };

    const step = () => {
      currentDimension.width += deltaW;
      currentDimension.height += deltaH;
      if (
        currentDimension.width < endWidth ||
        currentDimension.height < endHeight
      ) {
        cb(currentDimension);
        window.requestAnimationFrame(step);
      } else {
        cb(currentDimension);
      }
    };
    step();
  };
}
