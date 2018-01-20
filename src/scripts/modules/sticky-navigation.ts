export default function stickyNavigation () {
  interface NotificationOptions {
    height: number;
    scrollPosition: number;
    ticking: boolean;
  }

  //-- Read Values Only !!!!!
  //-- First keep track of the scroll value
  //-- without triggering unnecessary draw calls
  const navigation: HTMLElement = document.querySelector('.js_sticky-nav');
  if (!navigation) {
      return;
  }
  const notificationTeaser: HTMLElement = document.querySelector('.js_notification');
  const options: NotificationOptions = {
    height: navigation.offsetHeight,
    scrollPosition: 0,
    ticking: false
  };

  const init = (): void => {
    navigation.classList.toggle('is-undocked',
    window.scrollY >= options.height);
  }
  init();

  const getTeaserHeight = (): number => {
    if (!notificationTeaser) {
        return 0;
    }
    return notificationTeaser.offsetHeight;
  };

  const onScroll = (): void => {
    options.scrollPosition = window.scrollY;
    requestTick();
  };

  //-- Triggers requestAnimationFrame when it's necessary only
  const requestTick = (): void => {
    if (!options.ticking) {
      requestAnimationFrame(update);
    }
    options.ticking = true;
  };

  //-- Visual Updates Callback
  //-- Use rAf to handle visual updates and write values
  const update = () => {
    //-- Pull the latest value when we need it
    let currentScrollPositionY: number = options.scrollPosition;

    if (notificationTeaser) {
      navigation.classList.toggle('is-sticky',
          currentScrollPositionY >= getTeaserHeight());

      navigation.classList.toggle('is-undocked',
          currentScrollPositionY >= (getTeaserHeight() - 1));

    } else {
      navigation.classList.toggle('is-undocked',
          currentScrollPositionY >= options.height);
    }

    options.ticking = false;
  };

  window.addEventListener('scroll', onScroll, { capture: false, passive: true });
}
