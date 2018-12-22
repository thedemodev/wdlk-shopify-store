export interface SliderConfig {
  index: number;
  startX: number;
  startMoveX: number;
  moveX: number;
}

export interface HandleTouchProps {
  trackEl: Element;
  dots: Element[];
  dotIndex: number;
  trackWidth: number;
  itemLength: number;
  slider: SliderConfig;
  duration: number;
}

export interface HandleMouseProps {
  trackEl: Element;
  dots: Element[];
  dotIndex: number;
  trackWidth: number;
  itemLength: number;
  slider: SliderConfig;
  duration: number;
}

export interface HandleMouseMoveProps {
  isNext: boolean;
  trackEl: Element;
  slideWidth: number;
}

export interface HandleInfiniteProps {
  trackEl: Element;
  trackWidth: number;
  itemLength: number;
  slider: SliderConfig;
}

export interface JumpToSlideInit {
  trackEl: Element;
  dots: Element[];
  dotIndex: number;
  slider: SliderConfig;
  slideWidth: number;
}

export interface UpdateDotsInit {
  dots: Element[];
  dotIndex: number;
}

export interface SliderInit {
  trackEl: Element;
  slides: Element[];
  controls: Element[];
  dots: Element[];
  slider: SliderConfig;
  duration: number;
}

export interface TouchInit {
  trackEl: Element;
  slides: Element[];
  dots: Element[];
  slider: SliderConfig;
  duration: number;
  onStart(slider: SliderConfig): (e: TouchEvent) => SliderConfig;
  onMove(onMoveInit: HandleTouchProps): (e: TouchEvent) => SliderConfig;
  onEnd(onEndInit: HandleTouchProps): (e: TouchEvent) => SliderConfig;
}

export interface MouseInit {
  trackEl: Element;
  slides: Element[];
  controls: Element[];
  dots: Element[];
  slider: SliderConfig;
  duration: number;
  onPrev(slider: HandleMouseProps): (e: MouseEvent) => SliderConfig;
  onNext(slider: HandleMouseProps): (e: MouseEvent) => SliderConfig;
  onMouseMove(init: HandleMouseMoveProps): (e: MouseEvent) => void;
  onMouseLeave(e: MouseEvent): void;
  jumpToSlide(init: JumpToSlideInit): (e: MouseEvent) => void;
}
