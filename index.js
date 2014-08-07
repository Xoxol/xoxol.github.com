/**
 * Created by e.kulikov on 04.08.2014.
 */
var connect = require('connect'),
    dispatch = require('dispatch'),
    quip = require('quip'),
    less = require('less'),
    fs = require('fs'),
    appConfig = require('./config'),
    lessConfig = require(appConfig.path + '/styles/configuration'),
    lessFeatures = require('./less-features');

connect()
    .use(dispatch(
        {
            '.+\\.css(\\?.*)?': lessCompiler
        }
    ))
    .listen(1337);

function lessCompiler (req, res, next) {
    var file = req._parsedUrl.pathname.replace('.css', '.less');

    fs.readFile('.' + file, 'utf-8', go);

    function go (err, code) {
        var parser = less.Parser();
        if(err) {
            console.log(err.message); //ToDo: заменить console.log на нормальный логгер
            res.end(err.message);
            return;
        }

        parser.parse(code, response);

        function response(err, data) {
            if(err) {
                res.end(err.toString());
                return;
            }
            var options = lessConfig.configuration;

            options.plugins = [];

            options.plugins.push(new lessFeatures(lessConfig.sets.ad));

            res.end(data.toCSS(options));
        }
    }
}