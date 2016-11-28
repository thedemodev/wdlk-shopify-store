export default function fbqEvents () {
	let signUpBtn = document.querySelector('.js_fbqNewsLead');
	let addToCartBtn = document.querySelector('.js_fbqAddToCart');

	if (addToCartBtn) {
		addToCartBtn.addEventListener('click', () => {
			fbq('track', 'AddToCart', {
				content_name: addToCartBtn.dataset.name,
				content_ids: [addToCartBtn.dataset.id],
				content_type: 'product',
				value: parseInt(addToCartBtn.dataset.value)
			});
		});
	}

	if (signUpBtn) {
		signUpBtn.addEventListener('click', () => {
			fbq('track', 'Lead');
		});
	}

	return;
}

