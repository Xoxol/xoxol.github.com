/**
 * Created by e.kulikov on 04.08.2014.
 */
var connect = require('connect'),
    dispatch = require('dispatch'),
    less = require('less'),
    fs = require('fs'),
    config = require('./styles/configuration');

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
        if(err) {
            console.log(err.message); //ToDo: заменить console.log на нормальный логгер
            res.end(err.message);
        }

        res.end(code);
    }
}