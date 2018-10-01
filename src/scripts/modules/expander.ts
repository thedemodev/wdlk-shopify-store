import { Observable, Observer } from 'rxjs';
import { AspectRatio } from './picture-aspect-ratio';
import { mediaQuery, BreakPoint } from './match-media';
import { ViewBox, ViewBoxProps } from './viewbox';

export default function expander(): void {
  const viewPortHeight = window.innerHeight;
  const headerHeight = (document.querySelector('.js_sticky-nav') as HTMLElement)
    .offsetHeight;
  const expanderList: NodeListOf<SVGElement> = document.querySelectorAll(
    '.js_expander'
  );
  if (!expanderList) {
    return;
  }

  const contentHeightList: number[] = [...expanderList].map((el: Element) =>
    Math.round(
      el.querySelector('.js_expander-content').getBoundingClientRect().height
    )
  );
  const contentHeight: number = Math.max(...contentHeightList) + headerHeight;

  const viewbox = ViewBox({
    minX: 0,
    minY: 0,
    width: BreakPoint.S,
    height: BreakPoint.S * AspectRatio.S
  });
  let isCollapsed = true;

  const viewBoxStream = Observable.create((observer: Observer<string>) => {
    if (mediaQuery.S.matches) {
      const height = isCollapsed
        ? viewPortHeight / 3 - headerHeight / 3
        : BreakPoint.S * AspectRatio.S + contentHeight;

      viewbox.setHeight(height);
    }

    if (mediaQuery.M.matches) {
      const height = isCollapsed
        ? viewPortHeight / 3 - headerHeight / 3
        : BreakPoint.M * AspectRatio.M + contentHeight;

      viewbox.setWidth(BreakPoint.M);
      viewbox.setHeight(height);
    }

    if (mediaQuery.L.matches) {
      const width = isCollapsed ? BreakPoint.L / 3 : BreakPoint.L;

      viewbox.setWidth(width);
      viewbox.setHeight(BreakPoint.L * AspectRatio.L);
    }

    if (mediaQuery.XL.matches) {
      const width = isCollapsed ? BreakPoint.XL / 3 : BreakPoint.L;
      const height = isCollapsed
        ? BreakPoint.XL * AspectRatio.L * 1.5
        : BreakPoint.L * AspectRatio.L;

      viewbox.setWidth(width);
      viewbox.setHeight(height);
    }

    observer.next(viewbox.getViewBox());
  });

  const setViewBox = (node: SVGElement): void => {
    if (!node) {
      return;
    }
    viewBoxStream.subscribe((viewboxProps: ViewBoxProps) => {
      node.setAttribute('viewBox', `${viewboxProps}`);
    });
  };

  const toggleCustomProp = (node: SVGElement): void => {
    if (!node) {
      return;
    }
    if (mediaQuery.L.matches) {
      node.style.setProperty('--is-collapsed', `${isCollapsed ? 1 : 0}`);
      if (isCollapsed) {
        node.style.setProperty('--media-width', 'auto');
      } else {
        node.style.setProperty('--media-width', '100%');
      }
      return;
    }
    node.style.setProperty('--is-collapsed', `${isCollapsed ? 1 : 0}`);
  };

  const handleClick = (e: MouseEvent): void => {
    const target = e.currentTarget as SVGElement;
    isCollapsed = !isCollapsed;

    viewBoxStream.subscribe((viewboxProps: ViewBoxProps) => {
      target.setAttribute('viewBox', `${viewboxProps}`);
      toggleCustomProp(target);
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
