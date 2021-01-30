'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongodb = require('mongodb');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth = function () {
		function Auth(app) {
				_classCallCheck(this, Auth);

				this.app = app;

				this.createToken = this.createToken.bind(this);

				this.model = {
						userId: null,
						expire: null
				};
		}

		_createClass(Auth, [{
				key: 'createToken',
				value: function createToken(user) {
						var expire = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
						var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};


						var model = this.model;

						var db = this.app.db;

						model.userId = user._id;
						model.expire = expire;

						db.collection('tokens').insertOne(model, function (err, token) {
								return cb(err, model);
						});
				}
		}, {
				key: 'checkAuth',
				value: function checkAuth(req) {
						var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};


						var token = req.get('authorization');

						if (!token) {
								return cb(false);
						}

						var db = this.app.db;

						var query = {
								_id: new _mongodb.ObjectID(token)
						};
						db.collection('tokens').find(query).limit(1).toArray(function (err, tokenObjects) {

								var tokenObj = _lodash2.default.get(tokenObjects, '[0]', null);

								if (err === null && tokenObj) {

										return cb(true);
								}

								return cb(false);
						});
				}
		}]);

		return Auth;
}();

exports.default = Auth;
//# sourceMappingURL=auth.js.map