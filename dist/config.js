'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.s3Bucket = exports.s3Region = exports.s3Config = exports.url = exports.smtp = undefined;

var _s3Config = require('./s3-config.json');

var smtp = exports.smtp = {
    service: 'gmail',
    auth: {
        user: 'mockmail4me@gmail.com', // generated ethereal user
        pass: 'qdiodybswwjdygdm' // generated ethereal password
    }
};

var url = exports.url = 'https://fileshareapp.heroku.app';

var s3Config = exports.s3Config = {
    accessKeyId: _s3Config.accessKeyId,
    secretAccessKey: _s3Config.secretAccessKey
};

var s3Region = exports.s3Region = 'ap-south-1';
var s3Bucket = exports.s3Bucket = 'filesendingapp';
//# sourceMappingURL=config.js.map