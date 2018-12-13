import * as Slider from './slider';

function generateMockHTML(): {
  track: Element;
  slides: Element[];
} {
  document.body.innerHTML = `
  <section class="Slider">
    <div class="Slider-track js_slider">
      <div class="Slider-item js_slider-item"></div>
      <div class="Slider-item js_slider-item"></div>
    </div>
  </section>
`;
  return {
    track: document.querySelector('.js_slider'),
    slides: [...document.querySelectorAll('.js_slider-item')]
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
  const mockSliderConfig = {
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

  // tslint:disable-next-line:no-empty
  expect(Slider.handleStart(mockSliderConfig)(mockEvent)).toEqual({
    index: 0,
    moveX: 0,
    startX: 100,
    startMoveX: 0
  });
});

test('execute handleMove and return adjusted slider config', () => {
  const sliderMock = generateMockHTML();
  const handleMoveInit = {
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
  // tslint:disable-next-line:no-empty
  expect(Slider.handleMove(handleMoveInit)(mockEvent)).toEqual({
    index: 2,
    moveX: 1736,
    startX: 500,
    startMoveX: 300
  });
});

test('execute handleEnd and return adjusted slider config', () => {
  const sliderMock = generateMockHTML();
  const handleMoveInit = {
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
  // tslint:disable-next-line:no-empty
  expect(Slider.handleEnd(handleMoveInit)(mockEvent)).toEqual({
    index: 1,
    moveX: 300,
    startX: 500,
    startMoveX: 300
  });
});
