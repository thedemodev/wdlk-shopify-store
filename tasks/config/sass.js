var path         = require('path');
var fs           = require('fs');
var sass         = require('node-sass');
var postcss      = require('postcss');
var autoprefixer = require('autoprefixer-core');

function scss (cb) {
    var srcFile   = path.resolve( __dirname, '..', '..', 'src/scss/index.scss');
    var buildFile = path.resolve( __dirname, '..', '..', 'assets/index.css');
    var libsPath  = path.resolve( __dirname, '..', '..', 'src/scss/libs');

    sass.render({
        file: srcFile,
        outputStyle: 'compressed',
        outFile: buildFile,
        sourceMap: true,
        includePaths: [libsPath]
    }, function (err, result) {
        if (err) {
            console.log(error.status);
            console.log(error.column);
            console.log(error.message);
            console.log(error.line);
        } else {
                var results = postcss([autoprefixer({ browsers: ['last 2 versions'] })]).process(result.css);

                fs.writeFile(buildFile, results);

                console.log(results.css.toString());
                console.log(results.messages.toString());
                console.log(results);
        }
    });

}

module.exports = scss();
