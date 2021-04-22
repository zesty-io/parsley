'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDnd = require('react-dnd');

var _ItemTypes = require('./ItemTypes');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LayoutObjectText = function (_LayoutObject) {
    _inherits(LayoutObjectText, _LayoutObject);

    function LayoutObjectText(props) {
        var _ret;

        _classCallCheck(this, LayoutObjectText);

        var _this = _possibleConstructorReturn(this, (LayoutObjectText.__proto__ || Object.getPrototypeOf(LayoutObjectText)).call(this, props));

        _this.state = { value: '' };

        _this.handleChange = _this.handleChange.bind(_this);

        var _useDrag = (0, _reactDnd.useDrag)(function () {
            return {
                type: _ItemTypes.ItemTypes.LAYOUTOBJECTTEXT,
                collect: function collect(monitor) {
                    return {
                        isDragging: !!monitor.isDragging()
                    };
                }
            };
        }, []),
            _useDrag2 = _slicedToArray(_useDrag, 3),
            isDragging = _useDrag2[0].isDragging,
            drag = _useDrag2[1],
            preview = _useDrag2[2];

        return _ret = React.createElement(
            'div',
            { ref: drag, className: 'dragging' },
            'OMG'
        ), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(LayoutObjectText, [{
        key: 'handleChange',
        value: function handleChange(e) {
            this.setState({ value: event.target.value });
        }
    }, {
        key: 'render',
        value: function render() {
            var styles = this.props.styles || {};

            return React.createElement(
                'div',
                { ref: drag, className: 'pvlLayoutObject' },
                React.createElement(
                    'label',
                    null,
                    'me again '
                ),
                React.createElement('input', { type: 'text', onChange: this.handleChange, value: this.state.value })
            );
        }
    }]);

    return LayoutObjectText;
}(LayoutObject);