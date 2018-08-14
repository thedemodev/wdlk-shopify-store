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
      collapsed: {
        width: BreakPoint.S,
        height: viewPortHeight / 3 - stickyHeaderHeight / 3
      },
      expanded: {
        width: BreakPoint.S,
        height: BreakPoint.S * AspectRatio.S
      }
    }),
    M: ViewBoxDimension({
      collapsed: {
        width: BreakPoint.M,
        height: viewPortHeight / 3 - stickyHeaderHeight / 3
      },
      expanded: {
        width: BreakPoint.M,
        height: BreakPoint.M * AspectRatio.M
      }
    }),
    L: ViewBoxDimension({
      collapsed: {
        width: BreakPoint.L * AspectRatio.L,
        height: BreakPoint.L * AspectRatio.L * 1.5
      },
      expanded: {
        width: BreakPoint.L,
        height: BreakPoint.L * AspectRatio.L
      }
    }),
    XL: ViewBoxDimension({
      collapsed: {
        width: BreakPoint.XL * AspectRatio.L,
        height: BreakPoint.XL * AspectRatio.L * 1.5
      },
      expanded: {
        width: BreakPoint.L,
        height: BreakPoint.L * AspectRatio.L
      }
    })
  };

  const viewBoxStream = Observable.create((observer: Observer<string>) => {
    if (mediaQuery.S.matches) {
      viewBox.S.setHeight(
        isCollapsed
          ? viewBoxDimensions.S.collapsed.height
          : viewBoxDimensions.S.expanded.height
      );
      observer.next(viewBox.S.getValues());
    }
    if (mediaQuery.M.matches) {
      viewBox.M.setHeight(
        isCollapsed
          ? viewBoxDimensions.M.collapsed.height
          : viewBoxDimensions.M.expanded.height
      );
      observer.next(viewBox.M.getValues());
    }
    if (mediaQuery.L.matches) {
      if (isCollapsed) {
        viewBox.L.setWidth(viewBoxDimensions.L.collapsed.width);
        viewBox.L.setHeight(viewBoxDimensions.L.collapsed.height);
      } else {
        viewBox.L.setWidth(viewBoxDimensions.L.expanded.width);
        viewBox.L.setHeight(viewBoxDimensions.L.expanded.height);
      }
      observer.next(viewBox.L.getValues());
    }
    if (mediaQuery.XL.matches) {
      if (isCollapsed) {
        viewBox.L.setWidth(viewBoxDimensions.L.collapsed.width);
        viewBox.L.setHeight(viewBoxDimensions.L.collapsed.height);
      } else {
        viewBox.L.setWidth(viewBoxDimensions.L.expanded.width);
        viewBox.L.setHeight(viewBoxDimensions.L.expanded.height);
      }
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

  const toggleCustomProp = (node: SVGElement): void => {
    if (node) {
      node.style.setProperty('--is-collapsed', `${isCollapsed ? 1 : 0}`);
    }
  };

  const handleClick = (e: MouseEvent): void => {
    const target = e.currentTarget as SVGElement;
    isCollapsed = !isCollapsed;
    viewBoxStream.subscribe((viewbox: string) => {
      target.setAttribute('viewBox', `${viewbox}`);
    });

    if (mediaQuery.L.matches) {
      toggleCustomProp(target);
    }
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
