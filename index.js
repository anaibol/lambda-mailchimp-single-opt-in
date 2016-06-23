'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _mailchimp = require('mailchimp');

var _mailchecker = require('mailchecker');

var _mailchecker2 = _interopRequireDefault(_mailchecker);

var _emailVerify = require('email-verify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env;
var API_KEY = _process$env.API_KEY;
var LIST_ID = _process$env.LIST_ID;


var api = new _mailchimp.MailChimpAPI(API_KEY, { version: '2.0' });

function handler(_ref, context, cb) {
  var email = _ref.email;
  var first_name = _ref.first_name;

  if (!email) return cb(new Error('mail is empty'));

  if (!_mailchecker2.default.isValid(email)) {
    return cb(new Error('mail is invalid'));
  }

  cb(null, {});

  (0, _emailVerify.verify)(email, function (err, info) {
    if (err) {
      return cb(err);
    }

    var merge_vars = {
      FNAME: first_name
    };

    api.call('lists', 'subscribe', { id: LIST_ID, email: { email: email }, merge_vars: merge_vars, double_optin: false, update_existing: true }, function (err, res) {});
  });
}
