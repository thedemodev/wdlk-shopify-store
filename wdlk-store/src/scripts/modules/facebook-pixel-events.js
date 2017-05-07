export default function fbqEvents () {
	let addToCart = document.querySelector('.js_fbqAddToCart');
	let signUpBtn = document.querySelector('.js_fbqNewsLead');


	if (addToCart) {
		let btn = addToCart.querySelector('.js_fbqBtn');
		let select = addToCart.querySelector('.js_fbqSelect');

		if (btn && select) {
			let productId = parseFloat(select.options[select.selectedIndex].value);
			let value = parseFloat(btn.dataset.value).toFixed(2);
			btn.addEventListener('click', () => {
				fbq('track', 'AddToCart', {
					content_name: btn.dataset.name,
					content_ids: [productId],
					content_type: 'product',
					value: value,
					currency: 'EUR'
				});
			});
		}
	}

	if (signUpBtn) {
		signUpBtn.addEventListener('click', () => {
			fbq('track', 'Lead');
		});
	}

	return;
}

