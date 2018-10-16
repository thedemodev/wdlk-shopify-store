export interface DimensionProps {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface CurrentDimensionProps {
  x: number;
  y: number;
  sin: number;
}

type cbType = (n: CurrentDimensionProps) => {};

export function easeOut(dimension: DimensionProps): (d: number) => {} {
  return (duration: number) => (cb: cbType) => {
    const { x1, x2, y1, y2 } = dimension;
    const stepCount = duration / 16;
    const deltaX = (x2 - x1) / stepCount;
    const deltaY = (y2 - y1) / stepCount;
    const current = {
      x: x1,
      y: y1,
      sin: 0
    };

    const step = () => {
      current.sin += Math.PI / stepCount;
      current.x += deltaX * Math.sin(current.sin) ** 2 * 2;
      current.y += deltaY * Math.sin(current.sin) ** 2 * 2;

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
    const stepCount = duration / 16;
    const deltaX = (x1 - x2) / stepCount;
    const deltaY = (y1 - y2) / stepCount;
    const current = {
      x: x1,
      y: y1,
      sin: 0
    };

    const step = () => {
      current.sin += Math.PI / stepCount;
      current.x -= deltaX * Math.sin(current.sin) ** 2 * 2;
      current.y -= deltaY * Math.sin(current.sin) ** 2 * 2;
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
