const notification: HTMLElement = document.querySelector('.js-cookie-notification');
const closeButton: HTMLElement = document.querySelector('.js-cookie-notification-close');
const localStorage: Storage = window.localStorage;

const notificationHidden = (): string => {
    return localStorage.getItem('hideCookieNotification');
}
const hideNotification = ():void => {
    localStorage.setItem('hideCookieNotification', 'true');
    notification.style.display = 'none';
}

export default (): void => {
    if(notificationHidden()) {
      return;
    }

    notification.style.display = 'block';
    // const removeCloseButtonClickHandler = closeButton.addEventListener('click', () => {
    //     hideNotification();
    //     closeButton.removeEventListener('click', removeCloseButtonClickHandler);
    // });
    closeButton.addEventListener('click', hideNotification);
    closeButton.removeEventListener('click', hideNotification);
  };


