export interface SliderConfig {
  index: number;
  startX: number;
  startMoveX: number;
  moveX: number;
  transition: number;
}

export interface HandleTouchProps {
  trackEl: Element;
  dotIndex: number;
  trackWidth: number;
  itemLength: number;
  config: SliderConfig;
}

export interface HandleMouseProps {
  trackEl: Element;
  dotIndex: number;
  dotList?: Element[];
  trackWidth: number;
  itemLength: number;
  config: SliderConfig;
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
  config: SliderConfig;
}

export interface JumpToSlideInit {
  trackEl: Element;
  dotList: Element[];
  dotIndex: number;
  config: SliderConfig;
  slideWidth: number;
}

export interface UpdateDotsInit {
  dotList: Element[];
  dotIndex: number;
}

export interface SliderInit {
  sliderEl: Element;
  trackEl: Element;
  config: SliderConfig;
}

export interface TouchInit {
  sliderEl: Element;
  trackEl: Element;
  slideList: Element[];
  config: SliderConfig;
}

export interface MouseInit {
  sliderEl: Element;
  trackEl: Element;
  slideList: Element[];
  config: SliderConfig;
}
