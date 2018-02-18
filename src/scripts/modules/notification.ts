import { EventEmitter } from 'events';

export default function notification(): void {

  const notificationEl: HTMLElement = document.querySelector('.js_notification');
  if (!notificationEl) {
    return;
  }
  const closeBtn: HTMLElement = notificationEl.querySelector('.js_notification-btn');
  const sessionStorage: Storage = window.sessionStorage;
  const hiddenNotification = 'hiddenNotification';
  const activeClass = 'is-active';

  const verifyNotification = (): string => sessionStorage.getItem(hiddenNotification);

  if (verifyNotification()) { return; }

  const loadNotification = (): void => {
    notificationEl.classList.add(activeClass);
  };

  const hideNotification = (): void => {
    sessionStorage.setItem(hiddenNotification, 'true');
    notificationEl.classList.remove(activeClass);
  };

  const handleLoadEvent = (): void => {
    loadNotification();
    window.removeEventListener('load', handleLoadEvent);
  };

  const handleClickEvent = (): void => {
    hideNotification();
    closeBtn.removeEventListener('click', handleClickEvent);
  };

  window.addEventListener('load', handleLoadEvent);
  window.addEventListener('click', handleClickEvent);
}
