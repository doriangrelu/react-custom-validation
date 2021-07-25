"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parsePhrase = exports.parseError = exports.defaultErrorTranslator = exports.validateMultipleRules = exports.validateSingleRule = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var validateSingleRule = function validateSingleRule(rule, value) {
  switch (rule) {
    case "email":
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(value);

    case "required":
      return value !== undefined && value !== null && value !== "";

    case "notEmpty":
      return value !== undefined && clean(value) !== "";

    default:
      return validateComplexeType(rule, value);
  }
};

exports.validateSingleRule = validateSingleRule;

var validateComplexeType = function validateComplexeType(rule, value) {
  if (_typeof(rule) !== "object") {
    return false;
  }

  var ruleType = rule.type || undefined;
  var ruleName = rule.name || undefined;
  var ruleValue = rule.value || undefined;

  if (ruleType === undefined || ruleValue === undefined || ruleName === undefined) {
    throw new Error("Missing required rule name and rule value, and rule type");
  }

  switch (ruleType) {
    case "custom":
      return ruleValue(value);

    case "pattern":
      return ruleValue.test(value);

    default:
      return false;
  }
};

var validateMultipleRules = function validateMultipleRules(rules, value) {
  return rules.map(function (r) {
    return validateSingleRule(r, value) ? undefined : extractErrorType(r, value);
  }).filter(function (e) {
    return e !== undefined;
  });
};

exports.validateMultipleRules = validateMultipleRules;

var clean = function clean(value) {
  return value.trim();
};

var extractErrorType = function extractErrorType(rule, value) {
  if (_typeof(rule) === "object") {
    return rule.name || undefined;
  }

  return rule.replaceAll("%value%", value);
};

var defaultErrorTranslator = function defaultErrorTranslator(errorKey) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  switch (parseError(errorKey)) {
    case "required":
      return "Ce champs est recquis";

    case "notEmpty":
      return "Ce champs ne doit pas être vide";

    case "email":
      return "Merci de fournir une adresse email valide";

    case "length.min":
      return parsePhrase(errorKey, "Doit être supérieur à {min}");

    case "length.max":
      return parsePhrase(errorKey, "Doit être inférieure à {max}");

    default:
      return "Oups une erreur est survenue";
  }
};

exports.defaultErrorTranslator = defaultErrorTranslator;

var parseError = function parseError(error) {
  var globalArgs = /([a-zA-Z0-9.\-_]+)\((.+)\)/;
  var groups = error.toString().match(globalArgs) || [];
  return groups.length === 3 ? groups[1] : error;
};

exports.parseError = parseError;

var parsePhrase = function parsePhrase(error, phrase) {
  var globalArgs = /([a-zA-Z0-9.\-_]+)\((.+)\)/;
  var result = phrase;
  var groups = _toConsumableArray(error.toString().match(globalArgs)) || [];

  if (groups.length === 3) {
    var matchArg = /([a-z0-9\\\-_/]+)=([\w\d/\\\-_+^]+)/;
    groups[2].toString().split(",").forEach(function (v) {
      var r = _toConsumableArray(v.trim().match(matchArg)) || [];

      if (r.length === 3) {
        result = result.replaceAll("{" + r[1] + "}", r[2]);
      }
    });
  }

  return result;
};

exports.parsePhrase = parsePhrase;