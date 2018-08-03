import { Observable, Observer } from 'rxjs';
import { AspectRatio } from './picture-aspect-ratio';
import { mediaQuery, BreakPoint } from './match-media';
import { ViewBox } from './viewbox';
import { ViewBoxDimension } from './viewbox-dimension';

export default function expander(): void {
  const viewPortHeight = window.innerHeight;
  const viewPortWidth = window.innerWidth;
  const stickyHeaderHeight: number = (document.querySelector(
    '.js_sticky-nav'
  ) as HTMLElement).offsetHeight;
  const expanderList: NodeListOf<SVGElement> = document.querySelectorAll(
    '.js_expander'
  );
  let isCollapsed = true;

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

  const viewBoxStream = Observable.create((observer: Observer<string>) => {
    if (mediaQuery.S.matches) {
      viewBox.S.setHeight(
        isCollapsed
          ? viewBoxDimensions.S.collapsed
          : viewBoxDimensions.S.expanded
      );
      observer.next(viewBox.S.getValues());
    }
    if (mediaQuery.M.matches) {
      viewBox.M.setHeight(
        isCollapsed
          ? viewBoxDimensions.M.collapsed
          : viewBoxDimensions.M.expanded
      );
      observer.next(viewBox.M.getValues());
    }
    if (mediaQuery.L.matches) {
      viewBox.M.setHeight(
        isCollapsed
          ? viewBoxDimensions.L.collapsed
          : viewBoxDimensions.L.expanded
      );
      observer.next(viewBox.L.getValues());
    }
    if (mediaQuery.XL.matches) {
      viewBox.M.setHeight(
        isCollapsed
          ? viewBoxDimensions.XL.collapsed
          : viewBoxDimensions.XL.expanded
      );
      observer.next(viewBox.XL.getValues());
    }
  });

  const setViewBox = (node: SVGElement): void => {
    if (node) {
      viewBoxStream.subscribe((viewbox: string) => {
        node.setAttribute('viewBox', `${viewbox}`);
      });
    }
  };

  const handleClick = (e: MouseEvent): void => {
    const target = e.currentTarget as SVGElement;
    isCollapsed = !isCollapsed;

    viewBoxStream.subscribe((viewbox: string) => {
      target.setAttribute('viewBox', `${viewbox}`);
    });
  };

  if (expanderList) {
    [...expanderList].forEach((node: SVGElement) => {
      setViewBox(node);
      node.addEventListener('click', handleClick);
    });
    window.requestAnimationFrame(() => {
      window.addEventListener(
        'resize',
        e => {
          [...expanderList].forEach((node: SVGElement) => {
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
