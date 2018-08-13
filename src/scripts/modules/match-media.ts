export enum BreakPoint {
  S = 375,
  M = 769,
  L = 1024,
  XL = 1440
}

export const mediaQuery = {
  S: window.matchMedia(`(min-width: ${BreakPoint.S}px)`),
  M: window.matchMedia(`(min-width: ${BreakPoint.M}px)`),
  L: window.matchMedia(`(min-width: ${BreakPoint.L}px)`),
  XL: window.matchMedia(`(min-width: ${BreakPoint.XL}px)`)
};
