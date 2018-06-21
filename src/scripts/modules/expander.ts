import { Observable, Observer, fromEvent, from } from 'rxjs';
import { AspectRatio } from './picture-aspect-ratio';
import { mediaQuery, BreakPoint } from './match-media';

// enum ViewBoxSize {
//   S,
//   M,
//   L,
//   XL
// }

// interface ViewBoxInit {
//   isExpanded: boolean;
//   size: ViewBoxSize;
// }

// class ViewBox {
//   private size = ViewBoxSize;
//   private isExpanded: boolean = false;
// }

export function foo(isExpanded: boolean = false): Observable<string> {
  return Observable.create((observer: Observer<string>) => {
    const viewportWidth = window.innerWidth;
    const viewBox = {
      S: `0 0 ${BreakPoint.S} ${
        isExpanded ? BreakPoint.S * AspectRatio.S : viewportWidth / 2
      }`,
      M: `0 0 ${BreakPoint.M} ${BreakPoint.M * AspectRatio.M}`,
      L: `0 0 ${BreakPoint.L} ${BreakPoint.L * AspectRatio.L}`,
      XL: `0 0 ${BreakPoint.XL} ${BreakPoint.XL * AspectRatio.L}`
    };

    if (mediaQuery.S.matches) {
      observer.next(viewBox.S);
    }
    if (mediaQuery.M.matches) {
      observer.next(viewBox.M);
    }
    if (mediaQuery.L.matches) {
      observer.next(viewBox.L);
    }
    if (mediaQuery.XL.matches) {
      observer.next(viewBox.XL);
    }
    mediaQuery.S.addListener(e => {
      if (e.matches) {
        observer.next(viewBox.S);
      }
    });
    mediaQuery.M.addListener(e => {
      if (e.matches) {
        observer.next(viewBox.M);
      }
    });
    mediaQuery.L.addListener(e => {
      if (e.matches) {
        observer.next(viewBox.L);
      }
    });
  });
}
const so = foo();
so.subscribe(bla => {
  console.log(bla, 'subscription');
});

export function viewBoxStream(
  viewportWidth: number,
  isExpanded: boolean = false
): Observable<string> {
  return Observable.create((observer: Observer<string>) => {
    // console.log(isExpanded, '&&&&');
    switch (viewportWidth) {
      /**
       * @type {BreakPoint.S}
       * Range from 0 - 768
       */
      case Math.min(BreakPoint.M, viewportWidth):
        observer.next(
          `0 0 ${BreakPoint.S} ${
            isExpanded ? BreakPoint.S * AspectRatio.S : viewportWidth / 2
          }`
        );
        break;
      /**
       * @type {BreakPoint.M}
       * Range from 768 - 1024
       */
      case Math.min(BreakPoint.L, viewportWidth):
        observer.next(`0 0 ${BreakPoint.M} ${BreakPoint.M * AspectRatio.M}`);
        break;
      /**
       * @type {BreakPoint.L}
       * Range from 1024 - 1440
       */
      case Math.min(BreakPoint.XL, viewportWidth):
        observer.next(`0 0 ${BreakPoint.L} ${BreakPoint.L * AspectRatio.L}`);
        break;
      /**
       * @type {default}
       * Range from 1440 - ∞
       */
      default:
        observer.next(`0 0 ${BreakPoint.XL} ${BreakPoint.XL * AspectRatio.L}`);
    }
  });
}

function toggleState(boolList: boolean[], i: number): void {
  boolList[i] = !boolList[i];
}

export function setViewBox(nodeList: NodeListOf<Element>): void {
  if (nodeList) {
    const state = [false, false, false];
    [...nodeList].forEach((node: HTMLElement, i: number) => {
      let stream = viewBoxStream(window.innerWidth, state[i]);
      const clickStream = fromEvent(node, 'click');
      clickStream.subscribe(click => {
        toggleState(state, i);
        console.log(click, state, '@@@@@');
        stream = viewBoxStream(window.innerWidth, state[i]);
      });
      stream.subscribe(viewbox => node.setAttribute('viewBox', `${viewbox}`));
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
