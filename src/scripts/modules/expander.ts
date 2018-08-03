import { Observable, Observer } from 'rxjs';
import { AspectRatio } from './picture-aspect-ratio';
import { mediaQuery, BreakPoint } from './match-media';
import { ViewBox } from './viewbox';
import { ViewBoxDimension } from './viewbox-dimension';

const viewBox = {
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
    observer.next(viewBox.S.getValues());
  }
  if (mediaQuery.M.matches) {
    observer.next(viewBox.M.getValues());
  }
  if (mediaQuery.L.matches) {
    observer.next(viewBox.L.getValues());
  }
  if (mediaQuery.XL.matches) {
    observer.next(viewBox.XL.getValues());
  }
});

function setViewBox(node: SVGElement): void {
  if (node) {
    viewBoxStream.subscribe((viewbox: string) => {
      node.setAttribute('viewBox', `${viewbox}`);
    });
  }
}

let isCollapsedFlag = false;

function handleClick(e: MouseEvent): void {
  const target = e.currentTarget as SVGElement;
  isCollapsedFlag = !isCollapsedFlag;

  viewBoxStream.subscribe((viewbox: string) => {
    initExpander(target, isCollapsedFlag);
    target.setAttribute('viewBox', `${viewbox}`);
  });
}

export function initExpander(
  node: SVGElement,
  isCollapsed: boolean = true
): void {
  const viewPortHeight = window.innerHeight;
  const viewPortWidth = window.innerWidth;
  const stickyHeaderHeight: number = (document.querySelector(
    '.js_sticky-nav'
  ) as HTMLElement).offsetHeight;
  const viewBoxDimensions = {
    S: ViewBoxDimension({
      collapsed: viewPortHeight / 3 - stickyHeaderHeight / 3,
      expanded: BreakPoint.S * AspectRatio.S
    }),
    M: ViewBoxDimension({
      collapsed: viewPortHeight / 3 - stickyHeaderHeight / 3,
      expanded: BreakPoint.M * AspectRatio.M
    }),
    L: ViewBoxDimension({
      collapsed: viewPortWidth / 3,
      expanded: BreakPoint.L * AspectRatio.L
    }),
    XL: ViewBoxDimension({
      collapsed: viewPortWidth / 3,
      expanded: BreakPoint.XL * AspectRatio.L
    })
  };

  if (node) {
    if (mediaQuery.S.matches) {
      viewBox.S.setHeight(
        isCollapsed
          ? viewBoxDimensions.S.collapsed
          : viewBoxDimensions.S.expanded
      );
    }
    if (mediaQuery.M.matches) {
      viewBox.M.setHeight(
        isCollapsed
          ? viewBoxDimensions.M.collapsed
          : viewBoxDimensions.M.expanded
      );
    }
    if (mediaQuery.L.matches) {
      viewBox.M.setHeight(
        isCollapsed
          ? viewBoxDimensions.L.collapsed
          : viewBoxDimensions.L.expanded
      );
    }
    if (mediaQuery.XL.matches) {
      viewBox.M.setHeight(
        isCollapsed
          ? viewBoxDimensions.XL.collapsed
          : viewBoxDimensions.XL.expanded
      );
    }
  }
}

export default function expander(): void {
  const expanderList: NodeListOf<SVGElement> = document.querySelectorAll(
    '.js_expander'
  );

  if (expanderList) {
    [...expanderList].forEach((node: SVGElement) => {
      initExpander(node);
      setViewBox(node);
      node.addEventListener('click', handleClick);
    });
    window.requestAnimationFrame(() => {
      window.addEventListener(
        'resize',
        e => {
          [...expanderList].forEach((node: SVGElement) => {
            initExpander(node);
            setViewBox(node);
          });
        },
        {
          passive: true
        }
      );
    });
  }
}
