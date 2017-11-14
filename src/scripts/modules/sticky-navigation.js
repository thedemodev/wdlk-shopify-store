export default function stickyNavigation () {

  //-- Read Values Only !!!!!
  //-- First keep track of the scroll value
  //-- without triggering unnecessary draw calls
  const navigation = document.querySelector('.js_sticky-nav');
  if (!navigation) {
      return;
  }
  const notificationTeaser = document.querySelector('.js_notification');
  const options = {
    height: navigation.offsetHeight,
    scrollPosition: 0,
    ticking: false
  };

  const init = () => {
    navigation.classList.toggle('is-undocked',
    window.scrollY >= options.height);
  }
  init();

  const getTeaserHeight = () => {
    if (!notificationTeaser) {
        return;
    }
    return notificationTeaser.offsetHeight;
  };

  const onScroll = () => {
    options.scrollPosition = window.scrollY;
    requestTick();
  };

  //-- Triggers requestAnimationFrame when it's necessary only
  const  requestTick = () => {
    if (!options.ticking) {
      requestAnimationFrame(update);
    }
    options.ticking = true;
  };

  //-- Visual Updates Callback
  //-- Use rAf to handle visual updates and write values
  const update = () => {
    //-- Pull the latest value when we need it
    let currentScrollPositionY = options.scrollPosition;

    if (notificationTeaser) {
      navigation.classList.toggle('is-sticky',
          currentScrollPositionY >= currentTeaserHeight);

      navigation.classList.toggle('is-undocked',
          currentScrollPositionY >= (getTeaserHeight() - 1) + (options.height - 1));

    } else {
      navigation.classList.toggle('is-undocked',
          currentScrollPositionY >= options.height);
    }

    options.ticking = false;
  };

  window.addEventListener('scroll', onScroll, { capture: false, passive: true });
}
