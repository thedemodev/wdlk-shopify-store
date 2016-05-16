timber.drawersInit = function () {
    // timber.LeftDrawer = new timber.Drawers('NavDrawer', 'left');
    timber.RightDrawer = new timber.Drawers('CartDrawer', 'right', {
        {% if settings.ajax_cart_enable %}'onDrawerOpen': ajaxCart.load{% endif %}
    });
};
