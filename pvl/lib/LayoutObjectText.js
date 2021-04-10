"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LayoutObjectText = function (_LayoutObject) {
    _inherits(LayoutObjectText, _LayoutObject);

    function LayoutObjectText(props) {
        _classCallCheck(this, LayoutObjectText);

        var _this = _possibleConstructorReturn(this, (LayoutObjectText.__proto__ || Object.getPrototypeOf(LayoutObjectText)).call(this, props));

        _this.state = { value: '' };

        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(LayoutObjectText, [{
        key: "handleChange",
        value: function handleChange(e) {
            this.setState({ value: event.target.value });
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
                    "me again "
                ),
                React.createElement("input", { type: "text", onChange: this.handleChange, value: this.state.value })
            );
        }
    }]);

    return LayoutObjectText;
}(LayoutObject);