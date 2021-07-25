"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maxLengthStrict = exports.maxLength = exports.minLengthStrict = exports.minLength = void 0;

var minLengthStrict = function minLengthStrict() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  if (min < 0) {
    throw new Error("Min value must superior than 0");
  }

  return {
    type: "custom",
    name: "length.min(min=".concat(min, ")"),
    value: function value(_value) {
      return _value !== undefined && _value !== null && _value.length > min;
    }
  };
};

exports.minLengthStrict = minLengthStrict;

var minLength = function minLength() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var rule = {
    type: "custom",
    name: "length.min(min=".concat(min, ")"),
    value: function value(_value2) {
      return true;
    }
  };

  if (min === 0) {
    return rule;
  }

  rule.value = function (value) {
    return value !== undefined && value !== null && value.length >= min;
  };

  return minLengthStrict(min - 1);
};

exports.minLength = minLength;

var maxLengthStrict = function maxLengthStrict() {
  var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  if (max <= 0) {
    throw new Error("Max value must strictly superior than 0");
  }

  return {
    type: "custom",
    name: "length.max(max=".concat(max, ")"),
    value: function value(_value3) {
      return _value3 !== undefined && _value3 !== null && _value3.length < max;
    }
  };
};

exports.maxLengthStrict = maxLengthStrict;

var maxLength = function maxLength() {
  var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return maxLengthStrict(max + 1);
};

exports.maxLength = maxLength;