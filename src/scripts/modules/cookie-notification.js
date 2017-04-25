const notification = document.querySelector('.js-cookie-notification');
const closeButton = document.querySelector('.js-cookie-notification-close');
const localStorage = window.localStorage;

const notificationHidden = () => {
    return localStorage.getItem('hideCookieNotification');
}
console.log('yeep yeah');
const hideNotification = () => {
    localStorage.setItem('hideCookieNotification', true);
    notification.style.display = 'none';
}

export default () => {
    if(notificationHidden()) {
        return;
    }

    notification.style.display = 'block';
    const removeCloseButtenClickHandler = closeButton.addEventListener('click', () => {
        hideNotification();
        closeButton.removeEventListener('click', removeCloseButtenClickHandler);
    });
};
