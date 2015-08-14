require('./ext/fastclick.min.js');
require('./ext/handlebars.min.js');
require('./ext/modernizr.min.js');
require('./ext/jquery-1.11.2.min.js');
require('./ext/respond.min.js');

var example = require('./modules/example.js');

$(document).ready(function() {
    example();
});
