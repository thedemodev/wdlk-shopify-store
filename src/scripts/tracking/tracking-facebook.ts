export default function fbqTracking(): void {
  // document.addEventListener('DOMContentLoaded', event => {
  //   const dontTrackObject = document.querySelectorAll('[data-fbpixel]')[0];
  //   if (dontTrackObject != null) {
  //     dontTrackObject.addEventListener('click', () => {
  //       localStorage.setItem('DontTrackMe', true);
  //     });
  //   }
  //   if (localStorage.getItem('DontTrackMe') == null) {
  //     document.body.appendChild(tag);
  //   }
  // });

  const addToCart: HTMLElement = document.querySelector('.js_fbqAddToCart');
  const signUpBtn: HTMLElement = document.querySelector('.js_fbqNewsLead');

  if (addToCart) {
    const btn: HTMLElement = addToCart.querySelector('.js_fbqBtn');
    const select: HTMLFormElement = addToCart.querySelector('.js_fbqSelect');

    if (btn && select) {
      const productId: number = parseFloat(
        select.options[select.selectedIndex].value
      );
      btn.addEventListener('click', (): void => {
        fbq('track', 'AddToCart', {
          content_name: btn.dataset.name,
          content_ids: [`${productId}`],
          content_type: 'product',
          value: parseFloat(btn.dataset.value),
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
}
