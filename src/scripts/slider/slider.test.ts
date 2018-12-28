import * as Slider from './slider';
import * as Types from '../types';
import { jumpToSlide } from './mouse-events';
import { handleStart, handleMove, handleEnd } from './touch-events';
import { cloneFirstLast } from './utils';

function generateMockHTML(): {
  track: Element;
  slides: Element[];
  buttons: Element[];
  dotList: Element[];
} {
  document.body.innerHTML = `
  <section class="Slider">
    <button class="Slider-btn js_slider-btn"></button>
    <div class="Slider-track js_slider">
      <div class="Slider-item js_slider-item"></div>
      <div class="Slider-item js_slider-item"></div>
      <div class="Slider-item js_slider-item"></div>
      <div class="Slider-item js_slider-item"></div>
    </div>
    <button class="Slider-btn js_slider-btn"></button>
    <div class="Slider-navigation">
    <div class="Slider-dot js_slider-dot" style="--active: 1"></div>
    <div class="Slider-dot js_slider-dot" style="--active: 0"></div>
    <div class="Slider-dot js_slider-dot" style="--active: 0"></div>
  </div>
  </section>
`;

  return {
    track: document.querySelector('.js_slider'),
    slides: [...document.querySelectorAll('.js_slider-item')],
    buttons: [...document.querySelectorAll('.js_slider-btn')],
    dotList: [...document.querySelectorAll('.js_slider-dot')]
  };
}

test('create slider configuration object', () => {
  expect(Slider.Config.create({ transitionDuration: 300 })).toEqual(
    expect.objectContaining({
      index: 1,
      moveX: 0,
      startX: 0,
      startMoveX: 0,
      transition: 300
    })
  );
});

test('execute handleStart for the first time and return new config', () => {
  const handleMoveStartConfig: Types.SliderConfig = {
    index: 0,
    moveX: 0,
    startX: 0,
    startMoveX: 0,
    transition: 300
  };

  const mockTouch = {
    clientX: 100
  };

  // tslint:disable-next-line:no-object-literal-type-assertion
  const mockEvent = ({
    touches: [mockTouch]
  } as unknown) as TouchEvent;

  expect(handleStart(handleMoveStartConfig)(mockEvent)).toEqual({
    index: 0,
    moveX: 0,
    startX: 100,
    startMoveX: 0,
    transition: 300
  });
});

test('execute handleMove and return adjusted slider config', () => {
  const sliderMock = generateMockHTML();
  const handleMoveInit: Types.HandleTouchProps = {
    trackEl: sliderMock.track,
    trackWidth: 2304,
    itemLength: 3,
    dotIndex: 1,
    config: {
      index: 2,
      moveX: 100,
      startX: 500,
      startMoveX: 300,
      transition: 300
    }
  };

  const mockTouch = {
    clientX: 300
  };

  // tslint:disable-next-line:no-object-literal-type-assertion
  const mockEvent = ({
    touches: [mockTouch]
  } as unknown) as TouchEvent;

  expect(handleMove(handleMoveInit)(mockEvent)).toEqual({
    index: 2,
    moveX: 1736,
    startX: 500,
    startMoveX: 300,
    transition: 300
  });
});

test('execute handleEnd and return adjusted slider config', () => {
  const sliderMock = generateMockHTML();
  const handleMoveEndInit: Types.HandleTouchProps = {
    trackEl: sliderMock.track,
    trackWidth: 2304,
    itemLength: 3,
    dotIndex: 1,
    config: {
      index: 2,
      moveX: 300,
      startX: 500,
      startMoveX: 300,
      transition: 300
    }
  };

  const mockTouch = {
    clientX: 500
  };

  // tslint:disable-next-line:no-object-literal-type-assertion
  const mockEvent = ({
    touches: [mockTouch]
  } as unknown) as TouchEvent;

  expect(handleEnd(handleMoveEndInit)(mockEvent)).toEqual({
    index: 1,
    moveX: 300,
    startX: 500,
    startMoveX: 300,
    transition: 300
  });
});

test('execute handleNext and return the slider config', () => {
  const sliderMock = generateMockHTML();
  const handleNextClickInit: Types.HandleMouseProps = {
    trackEl: sliderMock.track,
    trackWidth: 3840,
    itemLength: 5,
    dotList: sliderMock.dotList,
    dotIndex: 0,
    config: {
      index: 1,
      moveX: 768,
      startX: 0,
      startMoveX: 0,
      transition: 300
    }
  };
  // tslint:disable-next-line:no-object-literal-type-assertion
  const mockClickEv = ({} as unknown) as MouseEvent;
  expect(Slider.handleNext(handleNextClickInit)(mockClickEv)).toEqual({
    index: 2,
    moveX: 1536,
    startX: 0,
    startMoveX: 0,
    transition: 300
  });
});

test('execute handlePrev and return the slider config', () => {
  const sliderMock = generateMockHTML();
  const handlePrevClickInit: Types.HandleMouseProps = {
    trackEl: sliderMock.track,
    trackWidth: 3840,
    itemLength: 5,
    dotList: sliderMock.dotList,
    dotIndex: 2,
    config: {
      index: 3,
      moveX: 2304,
      startX: 0,
      startMoveX: 0,
      transition: 300
    }
  };
  // tslint:disable-next-line:no-object-literal-type-assertion
  const mockClickEv = ({} as unknown) as MouseEvent;
  expect(Slider.handlePrev(handlePrevClickInit)(mockClickEv)).toEqual({
    index: 2,
    moveX: 1536,
    startX: 0,
    startMoveX: 0,
    transition: 300
  });
});

test('Reduce an Element array to the first and last elements', () => {
  const sliderMock = generateMockHTML();
  expect(cloneFirstLast(sliderMock.slides)).toHaveLength(2);
});

test('Receive index and move to the right slider', () => {
  const sliderMock = generateMockHTML();
  const JumpToSlideInit: Types.JumpToSlideInit = {
    trackEl: sliderMock.track,
    dotList: sliderMock.dotList,
    dotIndex: 1,
    slideWidth: 768,
    config: {
      index: 1,
      moveX: 768,
      startX: 0,
      startMoveX: 0,
      transition: 300
    }
  };
  // tslint:disable-next-line:no-object-literal-type-assertion
  const mockClickEv = ({
    currentTarget: sliderMock.dotList[1]
  } as unknown) as MouseEvent;
  expect(jumpToSlide(JumpToSlideInit)(mockClickEv)).toEqual({
    index: 2,
    moveX: 1536,
    startX: 0,
    startMoveX: 0,
    transition: 300
  });
});
