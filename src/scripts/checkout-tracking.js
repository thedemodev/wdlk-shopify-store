//-- This file is not included on build and it is
//-- not valid Javascript.
//-- Changes need to be manually included in admin
//-- under settings > checkout there is an
//-- additional scripts input field for it.
{% for item in order.line_items %}
	{% capture productId %}'{{ item.product.id }}'{% endcapture %}
	{% capture variantId %}'{{ item.variant.id }}'{% endcapture %}
{% endfor %}
<script>
	(function handleFbqTracking () {
			var timeoutId;

			function fbqTrackConversion () {
				fbq('track', 'Purchase', {
					content_name: 'Succesfull Conversion',
					content_ids: [{{ productId }}, {{ variantId }}],
					content_type: 'product',
					value: {{ subtotal_price | money_without_currency }},
					currency: '{{ shop.currency }}'
				});
			};

			function delayedTracking () {
				timeoutId = window.setTimeout(fbqTrackConversion, 600);
				console.log('@@@ The Facebook Purchase event was succussfylly initiated');
			};

			delayedTracking();
		})();
</script>
