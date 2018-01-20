import { EventEmitter } from "events";

export default function notification () {

  const notification: HTMLElement = document.querySelector('.js_notification');
  if (!notification) {
    return;
  }
  const closeBtn: HTMLElement = notification.querySelector('.js_notification-btn');
  const sessionStorage: Storage = window.sessionStorage;
  const hiddenNotification: string = 'hiddenNotification';
  const activeClass: string = 'is-active';

  const verifyNotification = (): string => sessionStorage.getItem(hiddenNotification);

  if (verifyNotification()) {
    return; 
  }

  const loadNotification = (): void => {
    notification.classList.add(activeClass);
  };

  const hideNotification = (): void => {
    sessionStorage.setItem(hiddenNotification, 'true');
    notification.classList.remove(activeClass);
  };

  const handleLoadEvent = (): void => {
    loadNotification();
    window.removeEventListener('load', handleLoadEvent);
  }

  const handleClickEvent = (): void => {
    hideNotification();
    closeBtn.removeEventListener('click', handleClickEvent);
  }

  window.addEventListener('load', handleLoadEvent);
  window.addEventListener('click', handleClickEvent);
}
