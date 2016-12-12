export default function stickyNavigation () {
    //-- Read Values Only !!!!!
    //-- First keep track of the scroll value
    //-- without triggering unnecessary draw calls
    const navigation = document.querySelector('.js_sticky-nav');
    const navigationHeight = navigation.offsetHeight;
    let lastScrollPositionY = 0;
    let ticking = false;

    console.log(navigationHeight, 'this is the height');

    const onScroll = () => {
        lastScrollPositionY = window.scrollY;
        requestTick();
    }

    //-- Triggers requestAnimationFrame when it's necessary only
    const  requestTick = () => {
        if (!ticking) {
            requestAnimationFrame(update);
        }
        ticking = true;
    }

    //-- Visual Updates Callback
    //-- Use rAf to handle visual updates and write values
    const update = () => {
        //-- Pull the latest value when we need it
        let currentScrollPositionY = lastScrollPositionY;

        navigation.classList.toggle('is-undocked', currentScrollPositionY >= navigationHeight);

        ticking = false;
    }

    window.addEventListener('scroll', onScroll, false);
}
