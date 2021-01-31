'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var saltRounds = 10;

var User = function () {
		function User(app) {
				_classCallCheck(this, User);

				this.app = app;

				this.model = {
						name: null,
						email: null,
						password: null,
						created: new Date(),
						updated: null
				};

				this.findUserByEmail = this.findUserByEmail.bind(this);
				this.login = this.login.bind(this);
				this.findById = this.findById.bind(this);
		}

		_createClass(User, [{
				key: 'findById',
				value: function findById() {
						var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
						var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};


						var db = this.app.db;

						var query = {
								_id: new _mongodb.ObjectID(id)
						};

						db.collection('users').find(query).limit(1).toArray(function (err, result) {

								var user = _lodash2.default.get(result, '[0]');
								if (err === null && user) {

										delete user.password;

										return cb(null, user);
								}

								var error = { message: "User not found." };
								return cb(error, null);
						});
				}
		}, {
				key: 'login',
				value: function login(email, password) {
						var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};


						var app = this.app;

						var error = null;
						var user = { name: "A", email: "test@gmail.com" };

						console.log("Email: ", email, "password:", password);

						if (!email || !password) {

								error = { message: "Email or password is required." };
								return callback(error, null);
						}

						this.findUserByEmail(email, function (err, user) {

								if (err === null && user) {

										var passwordCheck = _bcryptjs2.default.compareSync(password, user.password); // false


										if (passwordCheck) {

												// create new token and return this token key for user and use it for later request.
												var auth = new _auth2.default(app);

												auth.createToken(user, null, function (err, token) {

														if (err) {

																error = { message: "An error login your account" };
																return error, null;
														}

														delete user.password;
														token.user = user;
														return callback(null, token);
												});
										} else {

												error = { message: "Password does not match." };

												return callback(error, null);
										}
								}
								if (err || !user) {
										error = { message: "An error login your account" };

										return callback(error, null);
								}
						});
				}
		}, {
				key: 'initWithObject',
				value: function initWithObject(obj) {

						this.model.name = _lodash2.default.trim(_lodash2.default.get(obj, 'name', null));
						this.model.email = _lodash2.default.toLower(_lodash2.default.trim(_lodash2.default.get(obj, 'email', null)));
						this.model.password = _lodash2.default.get(obj, 'password', null);

						return this;
				}
		}, {
				key: 'validate',
				value: function validate() {
						var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};


						var errors = [];

						var model = this.model;
						var db = this.app.db;

						if (model.password.length < 3) {

								errors.push({
										message: "Password should more than 3 characters."
								});
						}

						this.findUserByEmail(model.email, function (err, user) {

								if (err || user) {

										errors.push({ message: "Email already exists." });
								}

								return cb(errors);
						});
				}
		}, {
				key: 'findUserByEmail',
				value: function findUserByEmail() {
						var email = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
						var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

						var db = this.app.db;

						var query = {
								email: email
						};

						db.collection('users').find(query).limit(1).toArray(function (err, result) {
								return callback(err, _lodash2.default.get(result, '[0]', null));
						});
				}
		}, {
				key: 'create',
				value: function create(cb) {

						var model = this.model;
						var db = this.app.db;

						var hashPassword = _bcryptjs2.default.hashSync(model.password, saltRounds);
						model.password = hashPassword;

						this.validate(function (errors) {

								var messages = [];

								if (errors.length > 0) {

										_lodash2.default.each(errors, function (err) {

												messages.push(err.message);
										});

										return cb(_lodash2.default.join(messages, ','), null);
								}

								db.collection('users').insertOne(model, function (err, result) {
										return cb(err, model);
								});
						});
				}
		}]);

		return User;
}();

exports.default = User;
//# sourceMappingURL=user.js.map