export default function fbqEvents () {
	let addToCartBtn = document.querySelector('.js_fbqAddToCart');
	if (!addToCartBtn) {
		return;
	}
	addToCartBtn.addEventListener('click', () => {
		fbq('track', 'AddToCart', {
			content_name: addToCartBtn.dataset.name,
			content_ids: [addToCartBtn.dataset.id],
			content_type: 'product',
			value: parseInt(addToCartBtn.dataset.value)
		});
		console.log('Facebook AddToCart event was succesfully initiated');
	});
}

