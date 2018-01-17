export default function setTheme() {
  const el = document.querySelector('.withTheme');
  if (el) {
    el.style.setProperty('--theme-invert', 'unset');
  }
}
