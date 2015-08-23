timber.mobileNavToggle = function () {
  timber.cache.$mobileSubNavToggle.on('click', function() {
    $(this).parent().toggleClass('mobile-nav--expanded');
  });
};
