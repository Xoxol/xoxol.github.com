/**
 * Created by e.kulikov on 04.08.2014.
 */
var http = require('http'),
    less = require('less'),
    url = require('url'),
    fs = require('fs'),
    parser = new less.Parser,
    server = new http.Server(),
    emit = server.emit,
    options = {
        'css': '',
        'dev': {},
        'min': {
            'compress': true
        }
    };

function render(res) {
    return function(err, lessString) {
        if(err) {
            console.log(err);
            return;
        }

        parser.parse(lessString, function(err, tree) {

        });
    }
}

function compile (res, option) {
    return function (err, lessString) {
        if(err) {
            console.log(err);
            return;
        }

        parser.parse(lessString.toString(), function(err, tree) {
            if(err) {
                console.log(err);
                res.end(err.toString());
                return;
            }

            console.log(tree);
            res.end(tree.toCSS(options[option]));
        });
    }
}

function request (req, res) {
    var path = url.parse(req.url).path,
        file = path.split('.');

    fs.readFile('.' + file[0] + '.less', compile(res, file[1]));

}

server.emit = function(e) {
    console.log(e);
    emit.apply(server, arguments);
};

server.listen(1337, '127.0.0.1');

server.on('request', request);