function fbqEvents () {
	var addToCartBtn = document.querySelector('.js_fbqAddToCart');

	addToCartBtn.addEventListener('click', function (e) {
		console.log('triggering the event on click', e);
		fbq('track', 'AddToCart', {
			// content_name: 'Really Fast Running Shoes',
			// content_category: 'Apparel & Accessories > Shoes',
			// content_ids: ['1234'],
			// content_type: 'product',
			// value: 4.99,
			// currency: {{shop.currency}};
		});

	});
	console.log('the script is working so far', fbq);
	console.log('liquid is on', {{shop.currency}});
}
