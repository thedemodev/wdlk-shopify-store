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
{% if first_time_accessed %}
<script>
  // If the order is succesful and project cece cookie, place tracking pixel to record the sale
  if (document.cookie.indexOf('refpartner=projce') > -1) {
    var trackpixel = '<img src="https://projectcece.com/de/affiliate/?affid=544261&netto={{ subtotal_price | money_without_currency }}&saleid={{ order_number }}&currency={{ shop.currency }}&tax={{ order.tax_price  | money_without_currency }}" height="1" width="1" />'; document.body.insertAdjacentHTML('beforeend', trackpixel);
  };
</script>
{% endif %}
