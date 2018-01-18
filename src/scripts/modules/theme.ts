const setTheme = ():void => {
  const el: HTMLElement = document.querySelector('.withTheme');
  if (el) {
    el.style.setProperty('--theme-invert', 'unset');
  }
}

export default setTheme;

