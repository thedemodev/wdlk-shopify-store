const fadeThrough = () => {
  const el: HTMLElement = document.querySelector('.js_fadeThrough');
  if (!el) {
    return;
  }
  const btnList: NodeListOf<Element> = document.querySelectorAll(
    '.js_fadeThrough-btn'
  );
  if (!btnList) {
    return;
  }
  let isVisible = false;

  const handleClick = (e: Event): void => {
    isVisible = !isVisible;
    el.style.setProperty('--is-visible', `${isVisible ? 1 : 0}`);
  };

  [...btnList].forEach((btn: HTMLElement) => {
    btn.addEventListener('click', handleClick);
  });
};

export default fadeThrough;
