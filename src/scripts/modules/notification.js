export default function notification () {
	const notification = document.querySelector('.js_notification');
	if (!notification) {
		return;
	}
	const closeBtn = notification.querySelector('.js_notification-btn');
	const sessionStorage = window.sessionStorage;
	const hiddenNotification = 'hiddenNotification';
	const activeClass = 'is-active';

	const verifyNotification = () => sessionStorage.getItem(hiddenNotification);

	if (verifyNotification()) {
		return;
	}

	const loadNotification = () => {
		notification.classList.add(activeClass);
	};

	const hideNotification = () => {
		sessionStorage.setItem(hiddenNotification, true);
		notification.classList.remove(activeClass);
	};

	const handleLoadEvent = window.addEventListener('load', () => {
		loadNotification();
		window.removeEventListener('load', handleLoadEvent);
	});

	const handleClickEvent = closeBtn.addEventListener('click', () => {
		hideNotification();
		closeBtn.removeEventListener('click', handleClickEvent);
	});
}
