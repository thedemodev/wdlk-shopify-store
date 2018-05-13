import { EventEmitter } from 'events';

export default function notification(): void {
  const notificationEl: HTMLElement = document.querySelector(
    '.js_notification'
  );
  if (!notificationEl) {
    return;
  }
  const closeBtn: HTMLElement = notificationEl.querySelector(
    '.js_notification-btn'
  );

  const hiddenNotification = 'hiddenNotification';
  const activeClass = 'is-active';

  if (JSON.parse(sessionStorage.getItem(hiddenNotification)) === null) {
    sessionStorage.setItem(hiddenNotification, 'false');
  }

  if (!JSON.parse(sessionStorage.getItem(hiddenNotification))) {
    notificationEl.classList.add(activeClass);
  }

  const hideNotification = (): void => {
    sessionStorage.setItem(hiddenNotification, 'true');
    notificationEl.classList.remove(activeClass);
  };

  closeBtn.addEventListener('click', hideNotification);
}
