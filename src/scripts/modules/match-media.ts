export enum BreakPoint {
  S = 375,
  M = 769,
  L = 1024,
  XL = 1440
}

export const mediaQuery = {
  S: window.matchMedia(
    `(min-width: ${BreakPoint.S}px) and (max-width: ${BreakPoint.M - 2}px)`
  ),
  M: window.matchMedia(
    `(min-width: ${BreakPoint.M}px) and (max-width: ${BreakPoint.L - 2}px)`
  ),
  L: window.matchMedia(
    `(min-width: ${BreakPoint.L}px) and (max-width: ${BreakPoint.XL - 2}px)`
  ),
  XL: window.matchMedia(`(min-width: ${BreakPoint.XL}px)`)
};
