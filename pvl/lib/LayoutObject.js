"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LayoutObject = function (_React$Component) {
    _inherits(LayoutObject, _React$Component);

    function LayoutObject(props) {
        _classCallCheck(this, LayoutObject);

        var _this = _possibleConstructorReturn(this, (LayoutObject.__proto__ || Object.getPrototypeOf(LayoutObject)).call(this, props));

        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(LayoutObject, [{
        key: "handleChange",
        value: function handleChange(e) {
            alert(e.target.value);
        }
    }, {
        key: "render",
        value: function render() {
            var styles = this.props.styles || {};

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "label",
                    null,
                    "hello"
                ),
                React.createElement("input", { type: "text", onChange: this.handleChange, value: "world" })
            );
        }
    }]);

    return LayoutObject;
}(React.Component);