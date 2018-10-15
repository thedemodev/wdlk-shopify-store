export interface DimensionProps {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface CurrentDimensionProps {
  x: number;
  y: number;
}

type cbType = (n: CurrentDimensionProps) => {};

export function easeOut(dimension: DimensionProps): (d: number) => {} {
  return (duration: number) => (cb: cbType) => {
    const { x1, x2, y1, y2 } = dimension;
    const deltaX = (x2 - x1) / (duration / 16);
    const deltaY = (y2 - y1) / (duration / 16);
    const current = {
      x: x1,
      y: y1
    };

    const step = () => {
      current.x += deltaX;
      current.y += deltaY;

      if (current.x < x2 || current.y < y2) {
        cb(current);
        window.requestAnimationFrame(step);
      } else {
        cb(current);
      }
    };
    step();
  };
}

export function easeIn(dimension: DimensionProps): (d: number) => {} {
  return (duration: number) => (cb: cbType) => {
    const { x1, x2, y1, y2 } = dimension;
    const deltaX = (x1 - x2) / (duration / 16);
    const deltaY = (y1 - y2) / (duration / 16);
    const current = {
      x: x1,
      y: y1
    };

    const step = () => {
      current.x -= deltaX;
      current.y -= deltaY;
      if (current.x > x2 || current.y > y2) {
        cb(current);
        window.requestAnimationFrame(step);
      } else {
        cb(current);
      }
    };
    window.requestAnimationFrame(step);
  };
}
