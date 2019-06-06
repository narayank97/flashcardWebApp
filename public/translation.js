var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { makeCorsRequest, makeCorsRequestStore, renderStartReview } from "./makeRequest.js";

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

var Title = function (_React$Component) {
  _inherits(Title, _React$Component);

  function Title() {
    _classCallCheck(this, Title);

    return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).apply(this, arguments));
  }

  _createClass(Title, [{
    key: "btnClick",
    value: function btnClick() {
      browserHistory.push(this.props.btnpath);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "title" },
        React.createElement(Button, { "class": "button-blue", text: this.props.btntext, btnpath: this.props.btnpath, btnClick: this.btnClick }),
        React.createElement(
          "h1",
          null,
          "Lango!"
        )
      );
    }
  }]);

  return Title;
}(React.Component);

var Button = function (_React$Component2) {
  _inherits(Button, _React$Component2);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  _createClass(Button, [{
    key: "btnClickAdd",
    value: function btnClickAdd() {
      browserHistory.push("/add");
    }
  }, {
    key: "btnClickReview",
    value: function btnClickReview() {
      browserHistory.push("/start_review");
    }
  }, {
    key: "render",
    value: function render() {
      console.log(this.props.btnpath);
      return React.createElement(
        "div",
        { className: this.props.class, onClick: this.props.click ? this.props.click : this.props.btnpath === "add" ? this.btnClickAdd : this.btnClickReview },
        React.createElement(
          "p",
          null,
          this.props.text
        )
      );
    }
  }]);

  return Button;
}(React.Component);

var Correct = function (_React$Component3) {
  _inherits(Correct, _React$Component3);

  function Correct() {
    _classCallCheck(this, Correct);

    return _possibleConstructorReturn(this, (Correct.__proto__ || Object.getPrototypeOf(Correct)).apply(this, arguments));
  }

  _createClass(Correct, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "correct" },
        React.createElement(
          "p",
          null,
          "CORRECT!"
        )
      );
    }
  }]);

  return Correct;
}(React.Component);

var Wrong = function (_React$Component4) {
  _inherits(Wrong, _React$Component4);

  function Wrong() {
    _classCallCheck(this, Wrong);

    return _possibleConstructorReturn(this, (Wrong.__proto__ || Object.getPrototypeOf(Wrong)).apply(this, arguments));
  }

  _createClass(Wrong, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "p",
        null,
        this.props.input
      );
    }
  }]);

  return Wrong;
}(React.Component);

var Footer = function (_React$Component5) {
  _inherits(Footer, _React$Component5);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "footer" },
        React.createElement(
          "p",
          null,
          this.props.username
        )
      );
    }
  }]);

  return Footer;
}(React.Component);

var Google = function (_React$Component6) {
  _inherits(Google, _React$Component6);

  function Google() {
    _classCallCheck(this, Google);

    return _possibleConstructorReturn(this, (Google.__proto__ || Object.getPrototypeOf(Google)).apply(this, arguments));
  }

  _createClass(Google, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "google" },
        React.createElement("img", { src: "./assets/google.jpg" }),
        React.createElement(
          "p",
          null,
          "Log in with Google"
        )
      );
    }
  }]);

  return Google;
}(React.Component);

var CardInput = function (_React$Component7) {
  _inherits(CardInput, _React$Component7);

  function CardInput() {
    _classCallCheck(this, CardInput);

    return _possibleConstructorReturn(this, (CardInput.__proto__ || Object.getPrototypeOf(CardInput)).apply(this, arguments));
  }

  _createClass(CardInput, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "fieldset",
        null,
        React.createElement("input", {
          name: this.props.name,
          id: this.props.id,
          type: this.props.type || "text",
          placeholder: this.props.placeholder,
          required: true
        })
      );
    }
  }]);

  return CardInput;
}(React.Component);

// React component for textarea


var CardTextarea = function (_React$Component8) {
  _inherits(CardTextarea, _React$Component8);

  function CardTextarea() {
    _classCallCheck(this, CardTextarea);

    return _possibleConstructorReturn(this, (CardTextarea.__proto__ || Object.getPrototypeOf(CardTextarea)).apply(this, arguments));
  }

  _createClass(CardTextarea, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "fieldset",
        null,
        React.createElement("textarea", {
          name: this.props.name,
          id: this.props.id,
          placeholder: this.props.placeholder,
          required: true
        })
      );
    }
  }]);

  return CardTextarea;
}(React.Component);

// React component for the front side of the card


var CardFront = function (_React$Component9) {
  _inherits(CardFront, _React$Component9);

  function CardFront() {
    _classCallCheck(this, CardFront);

    return _possibleConstructorReturn(this, (CardFront.__proto__ || Object.getPrototypeOf(CardFront)).apply(this, arguments));
  }

  _createClass(CardFront, [{
    key: "render",
    value: function render(props) {
      return React.createElement(
        "div",
        { className: "card-side side-front" },
        React.createElement(
          "div",
          { className: "card-side-container" },
          React.createElement(
            "div",
            { className: "refresh" },
            React.createElement("img", { src: "./assets/noun_Refresh_2310283.svg" })
          ),
          React.createElement(CardInput, { name: "in", id: "1", placeholder: "place" })
        )
      );
    }
  }]);

  return CardFront;
}(React.Component);

// React component for the back side of the card


var CardBack = function (_React$Component10) {
  _inherits(CardBack, _React$Component10);

  function CardBack() {
    _classCallCheck(this, CardBack);

    return _possibleConstructorReturn(this, (CardBack.__proto__ || Object.getPrototypeOf(CardBack)).apply(this, arguments));
  }

  _createClass(CardBack, [{
    key: "render",
    value: function render(props) {
      return React.createElement(
        "div",
        { className: "card-side side-back" },
        React.createElement(
          "div",
          { className: "card-side-container" },
          React.createElement(
            "div",
            { className: "refresh" },
            React.createElement("img", { src: "./assets/noun_Refresh_2310283.svg" })
          ),
          React.createElement(Correct, null)
        )
      );
    }
  }]);

  return CardBack;
}(React.Component);

// React component for the card (main component)


var Card = function (_React$Component11) {
  _inherits(Card, _React$Component11);

  function Card(props) {
    _classCallCheck(this, Card);

    var _this11 = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

    _this11.flip = function () {
      _this11.setState({ flipped: !_this11.state.flipped });
    };

    _this11.state = { flipped: false };
    _this11.flip = _this11.flip.bind(_this11);
    return _this11;
  }

  _createClass(Card, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        {
          onClick: this.flip,
          className: "card-container" + (this.state.flipped ? " flipped" : "")
        },
        React.createElement(
          "div",
          { className: "card-body" },
          React.createElement(CardBack, { text: "Correct!" }),
          React.createElement(CardFront, { text: "Volare" })
        )
      );
    }
  }]);

  return Card;
}(React.Component);

var StartReview = function (_React$Component12) {
  _inherits(StartReview, _React$Component12);

  function StartReview() {
    _classCallCheck(this, StartReview);

    return _possibleConstructorReturn(this, (StartReview.__proto__ || Object.getPrototypeOf(StartReview)).apply(this, arguments));
  }

  _createClass(StartReview, [{
    key: "render",

    // constructor(props){
    //   super(props);
    //   this.state = {
    //     data: 'Jordan Belfort'
    //   }
    // }

    // componentDidMount() {
    //   this. makeRequest(... , callBackFunction) //very important,because js is async 

    // } 

    value: function render() {
      return React.createElement(
        "div",
        { className: "col" },
        React.createElement(Title, { btntext: "Add", btnpath: "add" }),
        React.createElement(
          "div",
          { className: "column-container" },
          React.createElement(Card, null),
          React.createElement(
            "div",
            { className: "small-card" },
            React.createElement("input", { id: "" })
          ),
          React.createElement(
            "div",
            { className: "btn-container" },
            React.createElement(Button, { "class": "button-green ", text: "Next", click: renderStartReview })
          )
        ),
        React.createElement(Footer, { username: "Daniel" })
      );
    }
  }]);

  return StartReview;
}(React.Component);

var AddPage = function (_React$Component13) {
  _inherits(AddPage, _React$Component13);

  function AddPage() {
    _classCallCheck(this, AddPage);

    return _possibleConstructorReturn(this, (AddPage.__proto__ || Object.getPrototypeOf(AddPage)).apply(this, arguments));
  }

  _createClass(AddPage, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "col" },
        React.createElement(Title, { btntext: "Start Review", btnpath: "review" }),
        React.createElement(
          "div",
          { className: "column-container" },
          React.createElement(
            "div",
            { className: "row-container" },
            React.createElement(
              "div",
              { className: "medium-card" },
              React.createElement("input", { id: "myWord", onKeyPress: makeCorsRequest })
            ),
            React.createElement(
              "div",
              { className: "medium-card" },
              React.createElement("p", { id: "outputGoesHere" })
            )
          ),
          React.createElement(
            "div",
            { className: "btn-container" },
            React.createElement(Button, {
              "class": "button-green ",
              text: "Save",
              click: makeCorsRequestStore
            })
          )
        ),
        React.createElement(Footer, { username: "Daniel" })
      );
    }
  }]);

  return AddPage;
}(React.Component);

var LogIn = function (_React$Component14) {
  _inherits(LogIn, _React$Component14);

  function LogIn() {
    _classCallCheck(this, LogIn);

    return _possibleConstructorReturn(this, (LogIn.__proto__ || Object.getPrototypeOf(LogIn)).apply(this, arguments));
  }

  _createClass(LogIn, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "full-height" },
        React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "div",
            { className: "left-half " },
            React.createElement(
              "div",
              { className: "text" },
              React.createElement(
                "h1",
                null,
                "Welcome to Lango!"
              ),
              React.createElement(
                "p",
                null,
                "Customize your vocabulary"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "right-half " },
            React.createElement(Google, null)
          )
        )
      );
    }
  }]);

  return LogIn;
}(React.Component);

ReactDOM.render(React.createElement(
  Router,
  { history: browserHistory },
  React.createElement(Route, { path: "/login", component: LogIn }),
  React.createElement(Route, { path: "/start_review", component: StartReview }),
  React.createElement(Route, { path: "/add", component: AddPage }),
  React.createElement(Route, { path: "*", component: StartReview })
), document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));

// StartReview PAGE

// ReactDOM.render(
//   <StartReview question="Hola Como Esta?" input="Hello! How are you?" />,
//   document.getElementById("root")
// );

// FIRST TIME PAGE
// ReactDOM.render(
//   <AddPage  />,
//   document.getElementById("root")
// );

// LOGIN PAGE
// ReactDOM.render(<LogIn />, document.getElementById("root"));

///////////////////////////////////////////////////////////

// Render Card component
// ReactDOM.render(<Card />, document.getElementById("root"));