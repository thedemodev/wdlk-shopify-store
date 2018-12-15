export interface SliderConfig {
  index: number;
  startX: number;
  startMoveX: number;
  moveX: number;
}

export interface HandleTouchProps {
  element: Element;
  elementWidth: number;
  itemLength: number;
  slider: SliderConfig;
}

export interface HandleMouseProps {
  element: Element;
  elementWidth: number;
  itemLength: number;
  slider: SliderConfig;
}

export interface SliderInitProps {
  slider: Element;
  slides: Element[];
  initConfig: SliderConfig;
  onStart(slider: SliderConfig): (e: TouchEvent) => SliderConfig;
  onMove(onMoveInit: HandleTouchProps): (e: TouchEvent) => SliderConfig;
  onEnd(onEndInit: HandleTouchProps): (e: TouchEvent) => SliderConfig;
}

export interface SliderDesktopInit {
  slider: Element;
  slides: Element[];
  buttons: Element[];
  initConfig: SliderConfig;
  onPrev(slider: HandleMouseProps): (e: MouseEvent) => SliderConfig;
  onNext(slider: HandleMouseProps): (e: MouseEvent) => SliderConfig;
}
