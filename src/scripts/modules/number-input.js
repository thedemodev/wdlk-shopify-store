export default function numberInput() {
    let nodeList = document.getElementsByClassName('js_numberInput');
    if (!nodeList) {
        return;
    }
    const NODE_ARRAY =  [...nodeList];
    const RMV_BTN_CLASS = 'js_remove';
    const ADD_BTN_CLASS = 'js_add';

    const INCREASE = n => parseInt(n) + 1;
    const DECREASE = n => parseInt(n) - 1;

    NODE_ARRAY.forEach(node => {
        let inputValue = 1;
        const INPUT_EL = node.querySelector('.js_value');
        if (!INPUT_EL) {
            return;
        }
        inputValue = INPUT_EL.getAttribute('value');
        console.log(inputValue, 'from the getAttribute');

        node.addEventListener('click', function (e) {
            if (e.target.classList.contains(ADD_BTN_CLASS)) {
                inputValue = INCREASE(inputValue);
                INPUT_EL.setAttribute('value', inputValue);
                console.log(inputValue, 'on the handle method');
            }

            if (e.target.classList.contains(RMV_BTN_CLASS)) {
                inputValue = DECREASE(inputValue);
                INPUT_EL.setAttribute('value', inputValue);
                console.log(inputValue, 'on the handle method');
            }
        });

    });
}
