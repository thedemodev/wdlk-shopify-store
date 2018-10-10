interface InitLerp {
  start: number;
  end: number;
  duration?: number;
}

export function lerp({ start, end, duration = 1000 }: InitLerp): void {
  const step = () => {
    start += (end - start) / duration;
    if (start < end) {
      console.log(start, '&&&&');
      window.requestAnimationFrame(step);
    }
  };
  step();
}

lerp({
  start: 10,
  end: 50
});
