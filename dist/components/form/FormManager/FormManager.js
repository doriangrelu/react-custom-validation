"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormManagerContext = exports.FormManager = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _validation = require("../../../core/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FormManagerContext = /*#__PURE__*/(0, _react.createContext)({
  data: {},
  liveValid: false,
  updateData: function updateData(name, value) {},
  validation: {},
  onErrorTranslator: function onErrorTranslator(error) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  }
});
exports.FormManagerContext = FormManagerContext;

var useForm = function useForm(defaultValue, validator, liveValid) {
  var _useState = (0, _react.useState)(defaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useValidator = useValidator(validator),
      _useValidator2 = _slicedToArray(_useValidator, 2),
      validation = _useValidator2[0],
      handleValid = _useValidator2[1];

  var updateData = (0, _react.useCallback)(function (name, value) {
    setData(_objectSpread(_objectSpread({}, data), {}, _defineProperty({}, name, value)));

    if (liveValid) {
      handleValid(name, value);
    }
  }, [data, setData, handleValid, liveValid]);
  return [data, updateData, validation];
};

var useFormContextValue = function useFormContextValue(data, updateData, validation, onErrorTranslate) {
  return {
    data: data,
    updateData: updateData,
    liveValid: false,
    validation: validation,
    onErrorTranslator: onErrorTranslate
  };
};

var useValidator = function useValidator(validator) {
  var _useState3 = (0, _react.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      validation = _useState4[0],
      setValidation = _useState4[1];

  var handleValid = (0, _react.useCallback)(function (name, value) {
    var status = (0, _validation.validateMultipleRules)(validator[name] || [], value);

    var validationCopy = _objectSpread({}, validation);

    delete validationCopy[name];

    if (status.length > 0) {
      validationCopy[name] = status;
    }

    setValidation(validationCopy);
  }, [validation, validator]);
  return [validation, handleValid];
};

var FormManager = function FormManager(_ref) {
  var children = _ref.children,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? {} : _ref$defaultValue,
      _ref$validator = _ref.validator,
      validator = _ref$validator === void 0 ? {} : _ref$validator,
      _ref$liveValid = _ref.liveValid,
      liveValid = _ref$liveValid === void 0 ? false : _ref$liveValid,
      onSubmit = _ref.onSubmit,
      _ref$onErrorTranslate = _ref.onErrorTranslate,
      onErrorTranslate = _ref$onErrorTranslate === void 0 ? _validation.defaultErrorTranslator : _ref$onErrorTranslate;

  var _useForm = useForm(defaultValue, validator, liveValid),
      _useForm2 = _slicedToArray(_useForm, 3),
      data = _useForm2[0],
      updateData = _useForm2[1],
      validation = _useForm2[2];

  var handleSubmit = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    onSubmit(data);
  }, [data, onSubmit]);
  return /*#__PURE__*/_react.default.createElement(FormManagerContext.Provider, {
    value: useFormContextValue(data, updateData, validation, onErrorTranslate)
  }, /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit
  }, children));
};

exports.FormManager = FormManager;
FormManager.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.element]),
  onSubmit: _propTypes.default.func.isRequired
};