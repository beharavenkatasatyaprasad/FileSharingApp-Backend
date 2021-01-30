'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongodb = require('mongodb');

var url = 'mongodb+srv://satyaprasadbehara:RB9dY2QVDX8nDqHz@cluster0.mdyvh.mongodb.net/filesystem?retryWrites=true&w=majority';

var client = _mongodb.mongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); //connect to db

exports.default = client;
//# sourceMappingURL=client.js.map