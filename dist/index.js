'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _config = require('./config');

var _mongodb = require('mongodb');

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _multerS = require('multer-s3');

var _multerS2 = _interopRequireDefault(_multerS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {connect} from "./database";
var url = 'mongodb+srv://satyaprasadbehara:RB9dY2QVDX8nDqHz@cluster0.mdyvh.mongodb.net/filesystem?retryWrites=true&w=majority';

var connect = function connect(callback) {

    _mongodb.MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, client) {
        return callback(err, client);
    });
};

// Amazon S3 Setup


_awsSdk2.default.config.update(_config.s3Config);

_awsSdk2.default.config.region = _config.s3Region;

var s3 = new _awsSdk2.default.S3();

// Setup Email

var email = _nodemailer2.default.createTransport(_config.smtp);

// File storage config

var storageDir = _path2.default.join(__dirname, '..', 'storage');

//const upload = multer({ storage: storageConfig }); // local upload.

var upload = (0, _multer2.default)({
    storage: (0, _multerS2.default)({
        s3: s3,
        bucket: _config.s3Bucket,
        metadata: function metadata(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function key(req, file, cb) {
            var filename = Date.now().toString() + '-' + file.originalname;
            cb(null, filename);
        }
    })
});

// End file storage config

var PORT = 3000;
var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

app.use((0, _morgan2.default)('dev'));

app.use((0, _cors2.default)({
    exposedHeaders: "*"
}));

app.use(_bodyParser2.default.json({
    limit: '50mb'
}));

app.set('root', __dirname);
app.set('storageDir', storageDir);
app.upload = upload;
app.email = email;
app.s3 = s3;

//Connect to the database.

connect(function (err, client) {

    if (err) {
        console.log("An error connecting to the database", err);
        throw err;
    }

    var db = client.db('app');
    app.db = client.db('app');
    app.set('db', db);

    // init routers.
    new _router2.default(app);

    app.server.listen(process.env.PORT || PORT, function () {
        console.log('App is running on port ' + app.server.address().port);
    });
});

exports.default = app;
//# sourceMappingURL=index.js.map