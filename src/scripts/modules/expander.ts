import { AspectRatio } from './picture-aspect-ratio';
import { mediaQuery, BreakPoint } from './match-media';
import * as Utils from '../utils';

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
  let isCollapsed = true;

  const getViewBoxDimension = () => {
    const dimension = {
      startWidth: BreakPoint.S,
      endWidth: BreakPoint.S,
      startHeight: viewPortHeight / 3 - headerHeight / 3,
      endHeight: BreakPoint.S * AspectRatio.S + contentHeight
    };

    if (mediaQuery.M.matches) {
      dimension.endHeight = BreakPoint.M * AspectRatio.M + contentHeight;
    }
    if (mediaQuery.L.matches) {
      dimension.startWidth = BreakPoint.L / 3;
      dimension.endWidth = BreakPoint.L;
      dimension.startHeight = BreakPoint.L * AspectRatio.L;
    }
    if (mediaQuery.XL.matches) {
      dimension.startWidth = BreakPoint.XL / 3;
      dimension.endWidth = BreakPoint.L;
      dimension.startHeight = BreakPoint.XL * AspectRatio.L * 1.5;
      dimension.endHeight = BreakPoint.L * AspectRatio.L;
    }
    return dimension;
  };

  const {
    startWidth,
    endWidth,
    startHeight,
    endHeight
  } = getViewBoxDimension();
  // tslint:disable-next-line:no-any
  const easeOut: any = Utils.easeOut({
    x1: startWidth,
    x2: endWidth,
    y1: startHeight,
    y2: endHeight
  })(500);
  // tslint:disable-next-line:no-any
  const easeIn: any = Utils.easeIn({
    x1: endWidth,
    x2: startWidth,
    y1: endHeight,
    y2: startHeight
  })(500);

  const toggleCustomProp = (node: SVGElement): void => {
    if (!node) {
      return;
    }
    node.style.setProperty('--is-collapsed', `${isCollapsed ? 1 : 0}`);
  };

  const setViewBox = (node: SVGElement): void => {
    if (!node) {
      return;
    }
    if (mediaQuery.L.matches) {
      node.setAttribute('viewBox', `0 0 ${endWidth} ${endHeight}`);
    } else {
      node.setAttribute(
        'viewBox',
        isCollapsed
          ? `0 0 ${startWidth} ${startHeight}`
          : `0 0 ${endWidth} ${endHeight}`
      );
    }
  };

  const handleClick = (e: MouseEvent): void => {
    const target = e.currentTarget as SVGElement;
    isCollapsed = !isCollapsed;
    toggleCustomProp(target);
    target.classList.toggle('is-collapsed', isCollapsed);
    if (mediaQuery.L.matches) {
      target.setAttribute('viewBox', `0 0 ${endWidth} ${endHeight}`);
    } else {
      isCollapsed
        ? easeIn((value: Utils.CurrentDimensionProps) =>
            target.setAttribute('viewBox', `0 0 ${value.x} ${value.y}`)
          )
        : easeOut((value: Utils.CurrentDimensionProps) =>
            target.setAttribute('viewBox', `0 0 ${value.x} ${value.y}`)
          );
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
