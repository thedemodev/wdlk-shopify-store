export default function numberInput(): void {
    const nodeList: HTMLCollectionOf<Element>  = document.getElementsByClassName('js_numberInput');
    if (!nodeList) {
      return;
    }

    const increase = (n: number): number => parseInt(`${n}`, 10) + 1;
    const decrease = (n: number): number => parseInt(`${n}`, 10) - 1;

    [...nodeList].forEach(node => {
        let inputValue = 1;
        let min = 0;
        const inputEl: HTMLInputElement = node.querySelector('.js_value');
        if (!inputEl) {
            return;
        }
        inputValue = parseInt(inputEl.getAttribute('value'), 10);
        min = parseInt(inputEl.getAttribute('min'), 10);

        node.addEventListener('click', (e: Event) => {
            if ((event.target as HTMLElement).classList.contains('js_add')) {
                inputValue = increase(inputValue);
                inputEl.setAttribute('value', inputValue.toString());
            }

            if ((event.target as HTMLElement).classList.contains('js_remove')) {
                if (inputValue <= min) {
                    return;
                }
                inputValue = decrease(inputValue);
                inputEl.setAttribute('value', inputValue.toString());
            }
        });

    });
}
