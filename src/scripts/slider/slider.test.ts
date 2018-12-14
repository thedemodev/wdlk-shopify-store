import * as Slider from './slider';

function generateMockHTML(): {
  track: Element;
  slides: Element[];
  buttons: Element[];
} {
  document.body.innerHTML = `
  <section class="Slider">
    <button class="Slider-btn js_slider-btn"></button>
    <div class="Slider-track js_slider">
      <div class="Slider-item js_slider-item"></div>
      <div class="Slider-item js_slider-item"></div>
    </div>
    <button class="Slider-btn js_slider-btn"></button>
  </section>
`;

  return {
    track: document.querySelector('.js_slider'),
    slides: [...document.querySelectorAll('.js_slider-item')],
    buttons: [...document.querySelectorAll('.js_slider-btn')]
  };
}

test('create slider configuration object', () => {
  expect(Slider.Config.create()).toEqual(
    expect.objectContaining({
      index: 0,
      moveX: 0,
      startX: 0,
      startMoveX: 0
    })
  );
});

test('execute handleStart for the first time and return new config', () => {
  const handleMoveStartConfig: Slider.SliderConfig = {
    index: 0,
    moveX: 0,
    startX: 0,
    startMoveX: 0
  };

  const mockTouch = {
    clientX: 100
  };

  // tslint:disable-next-line:no-object-literal-type-assertion
  const mockEvent = ({
    touches: [mockTouch]
  } as unknown) as TouchEvent;

  expect(Slider.handleStart(handleMoveStartConfig)(mockEvent)).toEqual({
    index: 0,
    moveX: 0,
    startX: 100,
    startMoveX: 0
  });
});

test('execute handleMove and return adjusted slider config', () => {
  const sliderMock = generateMockHTML();
  const handleMoveInit: Slider.HandleTouchProps = {
    element: sliderMock.track,
    elementWidth: 2304,
    itemLength: 3,
    slider: {
      index: 2,
      moveX: 100,
      startX: 500,
      startMoveX: 300
    }
  };

  const mockTouch = {
    clientX: 300
  };

  // tslint:disable-next-line:no-object-literal-type-assertion
  const mockEvent = ({
    touches: [mockTouch]
  } as unknown) as TouchEvent;

  expect(Slider.handleMove(handleMoveInit)(mockEvent)).toEqual({
    index: 2,
    moveX: 1736,
    startX: 500,
    startMoveX: 300
  });
});

test('execute handleEnd and return adjusted slider config', () => {
  const sliderMock = generateMockHTML();
  const handleMoveEndInit: Slider.HandleTouchProps = {
    element: sliderMock.track,
    elementWidth: 2304,
    itemLength: 3,
    slider: {
      index: 2,
      moveX: 300,
      startX: 500,
      startMoveX: 300
    }
  };

  const mockTouch = {
    clientX: 500
  };

  // tslint:disable-next-line:no-object-literal-type-assertion
  const mockEvent = ({
    touches: [mockTouch]
  } as unknown) as TouchEvent;

  expect(Slider.handleEnd(handleMoveEndInit)(mockEvent)).toEqual({
    index: 1,
    moveX: 300,
    startX: 500,
    startMoveX: 300
  });
});

test('execute handleNext and return the slider config', () => {
  const sliderMock = generateMockHTML();
  const handleNextClickInit: Slider.HandleMouseProps = {
    element: sliderMock.track,
    buttons: sliderMock.buttons,
    slider: {
      index: 2,
      moveX: 300,
      startX: 500,
      startMoveX: 300
    }
  };
  console.log(sliderMock.buttons);
});
