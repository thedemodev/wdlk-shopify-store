export default function fbqTracking () {
  const addToCart: HTMLElement = document.querySelector('.js_fbqAddToCart');
  const signUpBtn: HTMLElement = document.querySelector('.js_fbqNewsLead');

  if (addToCart) {
    const btn: HTMLElement = addToCart.querySelector('.js_fbqBtn');
    const select: HTMLFormElement = addToCart.querySelector('.js_fbqSelect');

    if (btn && select) {
      let productId: number = parseFloat(select.options[select.selectedIndex].value);
      let value: number = parseFloat(btn.dataset.value);
      btn.addEventListener('click', (): void => {
        fbq('track', 'AddToCart', {
          content_name: btn.dataset.name,
          content_ids: [`${productId}`],
          content_type: 'product',
          value: value,
          currency: 'EUR'
        });
      });
    }
  }

  if (signUpBtn) {
    signUpBtn.addEventListener('click', (): void => {
      fbq('track', 'Lead');
    });
  }

  return;
}

