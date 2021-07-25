"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubmitFormButton = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubmitFormButton = function SubmitFormButton(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react.default.createElement("button", {
    type: "submit"
  }, children);
};

exports.SubmitFormButton = SubmitFormButton;