export default function stickyNavigation () {
    //-- Read Values Only !!!!!
    //-- First keep track of the scroll value
    //-- without triggering unnecessary draw calls
    const NAV_NODE = document.getElementsByClassName('js_sticky-nav')[0];
    const NAV_NODE_HEIGHT = NAV_NODE.offsetHeight * 2;
    let lastScrollPositionY = 0;
    let ticking = false;

    const ON_SCROLL = () => {
        lastScrollPositionY = window.scrollY;
        REQUEST_TICK();
    }

    //-- Triggers requestAnimationFrame when it's necessary only
    const  REQUEST_TICK = () => {
        if (!ticking) {
            requestAnimationFrame(UPDATE);
        }
        ticking = true;
    }

    //-- Visual Updates Callback
    //-- Use rAf to handle visual updates and write values
    const UPDATE = () => {
        //-- Pull the latest value when we need it
        let currentScrollPositionY = lastScrollPositionY;

        NAV_NODE.classList.toggle('is-undocked', currentScrollPositionY >= NAV_NODE_HEIGHT);

        ticking = false;
    }

    window.addEventListener('scroll', ON_SCROLL, false);
}
