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

export function viewBoxStream(isExpanded: boolean = false): Observable<string> {
  return Observable.create((observer: Observer<string>) => {
    if (mediaQuery.S.matches || mediaQuery.M.matches) {
      observer.next(expanderViewBox.M.getValues());
    }
    if (mediaQuery.L.matches) {
      observer.next(expanderViewBox.L.getValues());
    }
    if (mediaQuery.XL.matches) {
      observer.next(expanderViewBox.XL.getValues());
    }
    mediaQuery.S.addListener(e => {
      if (e.matches) {
        observer.next(expanderViewBox.S.getValues());
      }
    });
    mediaQuery.M.addListener(e => {
      if (e.matches) {
        observer.next(expanderViewBox.M.getValues());
      }
    });
    mediaQuery.L.addListener(e => {
      if (e.matches) {
        observer.next(expanderViewBox.L.getValues());
      }
    });
  });
}

export function setViewBox(nodeList: NodeListOf<Element>): void {
  if (nodeList) {
    const state = [false, false, false];
    [...nodeList].forEach((node: HTMLElement, i: number) => {
      const stream = viewBoxStream(state[i]);

      // const clickStream = fromEvent(node, 'click');
      // clickStream.subscribe(click => {
      //   toggleState(state, i);
      //   console.log(click, state, '@@@@@');
      //   stream = viewBoxStream(window.innerWidth, state[i]);
      // });
      stream.subscribe(viewbox => {
        console.log(viewbox, 'viewbox stream');
        node.setAttribute('viewBox', `${viewbox}`);
      });
    });
  }
}

export function setImageSrc(nodeList: NodeListOf<Element>): void {
  if (nodeList) {
    const viewportWidth = window.innerWidth;
    if (viewportWidth > BreakPoint.M - 1 && viewportWidth < BreakPoint.L) {
      [...nodeList].forEach((node: HTMLElement) => {
        // tslint:disable-next-line:no-any
        const image = node.querySelector('image') as any;
        image.setAttribute('href', `${image.dataset.imageM}`);
      });
    }
    if (viewportWidth > BreakPoint.L - 1) {
      [...nodeList].forEach((node: HTMLElement) => {
        // tslint:disable-next-line:no-any
        const image = node.querySelector('image') as any;
        image.setAttribute('href', `${image.dataset.imageL}`);
      });
    }
  }
}

export function onResize(nodeList: NodeListOf<Element>): void {
  window.addEventListener(
    'resize',
    () => {
      setViewBox(nodeList);
      setImageSrc(nodeList);
    },
    {
      passive: true
    }
  );
}

export default function expander(): void {
  const expanderList: NodeListOf<Element> = document.querySelectorAll(
    '.js_expander'
  );

  if (expanderList) {
    setViewBox(expanderList);
    setImageSrc(expanderList);
    window.requestAnimationFrame(() => onResize(expanderList));
  }
}
