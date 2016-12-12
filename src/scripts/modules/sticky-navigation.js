export default function stickyNavigation () {
    //-- Read Values Only !!!!!
    //-- First keep track of the scroll value
    //-- without triggering unnecessary draw calls
    const navigation = document.querySelector('.js_sticky-nav');
    if (!navigation) {
        return;
    }
    const notificationTeaser = document.querySelector('.js_notification');
    let navigationHeight = navigation.offsetHeight;
    let lastScrollPositionY = 0;
    let ticking = false;


    const getTeaserHeight = () => {
        if (!notificationTeaser) {
            return;
        }
        return notificationTeaser.offsetHeight;
    };

    const onScroll = () => {
        lastScrollPositionY = window.scrollY;
        requestTick();
    };

    //-- Triggers requestAnimationFrame when it's necessary only
    const  requestTick = () => {
        if (!ticking) {
            requestAnimationFrame(update);
        }
        ticking = true;
    };

    //-- Visual Updates Callback
    //-- Use rAf to handle visual updates and write values
    const update = () => {
        //-- Pull the latest value when we need it
        let currentScrollPositionY = lastScrollPositionY;

        if (notificationTeaser) {
            let currentTeaserHeight = getTeaserHeight() - 1;
            let totalHeaderHeight = currentTeaserHeight + (navigationHeight - 1);

            navigation.classList.toggle('is-sticky',
                currentScrollPositionY >= currentTeaserHeight);

            navigation.classList.toggle('is-undocked',
                currentScrollPositionY >= totalHeaderHeight);

        } else {
            navigation.classList.toggle('is-undocked',
                currentScrollPositionY >= navigationHeight);
        }


        ticking = false;
    };

    window.addEventListener('scroll', onScroll, false);
}
