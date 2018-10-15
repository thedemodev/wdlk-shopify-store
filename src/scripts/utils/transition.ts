export interface DimensionProps {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface CurrentDimensionProps {
  width: number;
  height: number;
}

type cbType = (n: CurrentDimensionProps) => {};

export function easeOut(dimension: DimensionProps): (d: number) => {} {
  return (duration: number) => (cb: cbType) => {
    const { x1, x2, y1, y2 } = dimension;
    const deltaW = (x2 - x1) / (duration / 16);
    const deltaH = (y2 - y1) / (duration / 16);
    const currentDimension = {
      width: x1,
      height: y1
    };

    const step = () => {
      currentDimension.width += deltaW;
      currentDimension.height += deltaH;

      if (currentDimension.width < x2 || currentDimension.height < y2) {
        cb(currentDimension);
        window.requestAnimationFrame(step);
      } else {
        cb(currentDimension);
      }
    };
    step();
  };
}

export function easeIn(dimension: DimensionProps): (d: number) => {} {
  return (duration: number) => (cb: cbType) => {
    const { x1, x2, y1, y2 } = dimension;
    const deltaW = (x2 - x1) / (16 / duration);
    const deltaH = (y2 - y1) / (16 / duration);
    const currentDimension = {
      width: x1,
      height: y1
    };

    console.log(x1, y1);

    const step = () => {
      currentDimension.width -= deltaW;
      currentDimension.height -= deltaH;
      if (currentDimension.width > x2 || currentDimension.width > y2) {
        cb(currentDimension);
        window.requestAnimationFrame(step);
      } else {
        cb(currentDimension);
      }
    };
    window.requestAnimationFrame(step);
  };
}
