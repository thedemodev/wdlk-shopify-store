timber.productImageSwitch = function () {
  if (timber.cache.$thumbImages.length) {
    // Switch the main image with one of the thumbnails
    // Note: this does not change the variant selected, just the image
    timber.cache.$thumbImages.on('click', function(evt) {
      evt.preventDefault();
      var newImage = $(this).attr('href');
      timber.switchImage(newImage, null, timber.cache.$productImage);
    });
  }
};
