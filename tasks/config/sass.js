var path         = require('path');
var fs           = require('fs');
var sass         = require('node-sass');
var postcss      = require('postcss');
var autoprefixer = require('autoprefixer-core');

function scss (cb) {
    var srcFile   = path.resolve( __dirname, '..', '..', 'src/scss/index.scss');
    var buildFile = path.resolve( __dirname, '..', '..', 'assets/index.scss.liquid');
    var libsPath  = path.resolve( __dirname, '..', '..', 'src/scss/libs');


    sass.render({
        file: srcFile,
        outputStyle: 'nested',
        outFile: buildFile,
        sourceMap: true,
        includePaths: [libsPath]
    }, function (err, result) {
        if (err) {
            console.log('Error status:', err.status);
            console.log('Error column:', err.column, 'Error Line:', err.line);
            console.log('Error found in the file:', err.file );
            console.log(err.message);
        } else {
                var results = postcss([autoprefixer({ browsers: ['last 2 versions'] })]).process(result.css);

                fs.writeFile(buildFile, results);
                console.log(results.messages.toString());
                console.log('SASS compilation was successfully completed');
        }
    });

}

module.exports = scss();
