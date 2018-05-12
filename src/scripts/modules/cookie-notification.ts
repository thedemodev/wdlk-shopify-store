import StorageVisibilityFactory from './storage-visibility-factory';

export default (): void => {
  const notification: HTMLElement = document.querySelector(
    '.js-cookieNotification'
  );
  if (!notification) {
    return;
  }

  const acceptBtn: HTMLButtonElement = notification.querySelector(
    '.js-cookieNotificationBtn'
  );
  const cookieVisibility = StorageVisibilityFactory(
    'cookie-notification-visibility'
  );
  cookieVisibility.setInitialValue();
  if (cookieVisibility.isVisible) {
    notification.style.setProperty('--visibility', '0');
  }

  const handleClick = (e: Event) => {
    cookieVisibility.handleEvent(e);

    notification.style.setProperty(
      '--visibility',
      cookieVisibility.isVisible ? '0' : '100'
    );
  };

  acceptBtn.addEventListener('click', handleClick, { capture: true });
};
