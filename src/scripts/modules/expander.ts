import { Observable, Observer, fromEvent } from 'rxjs';
import { AspectRatio } from './picture-aspect-ratio';
import { mediaQuery, BreakPoint } from './match-media';
import { ViewBox } from './viewbox';

// `0 0 ${BreakPoint.S} ${
//   isExpanded ? BreakPoint.S * AspectRatio.S : viewportWidth / 2
// }`

const expanderViewBox = {
  S: new ViewBox({
    minX: 0,
    minY: 0,
    width: BreakPoint.S,
    height: BreakPoint.S * AspectRatio.S
  }),
  M: new ViewBox({
    minX: 0,
    minY: 0,
    width: BreakPoint.M,
    height: BreakPoint.M * AspectRatio.M
  }),
  L: new ViewBox({
    minX: 0,
    minY: 0,
    width: BreakPoint.L,
    height: BreakPoint.L * AspectRatio.L
  }),
  XL: new ViewBox({
    minX: 0,
    minY: 0,
    width: BreakPoint.XL,
    height: BreakPoint.XL * AspectRatio.L
  })
};

export const viewBoxStream = Observable.create((observer: Observer<string>) => {
  if (mediaQuery.S.matches) {
    observer.next(expanderViewBox.S.getValues());
  }
  if (mediaQuery.M.matches) {
    observer.next(expanderViewBox.M.getValues());
  }
  if (mediaQuery.L.matches) {
    observer.next(expanderViewBox.L.getValues());
  }
  if (mediaQuery.XL.matches) {
    observer.next(expanderViewBox.XL.getValues());
  }
});

export function setViewBox(nodeList: NodeListOf<Element>): void {
  if (nodeList) {
    [...nodeList].forEach((node: HTMLElement) => {
      viewBoxStream.subscribe((viewbox: string) => {
        node.setAttribute('viewBox', `${viewbox}`);
      });
    });
  }
}

export function onResize(nodeList: NodeListOf<Element>): void {
  window.addEventListener('resize', () => setViewBox(nodeList), {
    passive: true
  });
}

export default function expander(): void {
  const expanderList: NodeListOf<Element> = document.querySelectorAll(
    '.js_expander'
  );

  if (expanderList) {
    setViewBox(expanderList);
    window.requestAnimationFrame(() => onResize(expanderList));
  }
}
