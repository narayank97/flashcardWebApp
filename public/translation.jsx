import {
  makeCorsRequest,
  makeCorsRequestStore,
  renderStartReview,
  renderUserName
} from "./makeRequest.js";

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

let cards = [];
let index = 0;
let userInput = "";

class Title extends React.Component {
  btnClick() {
    browserHistory.push(this.props.btnpath);
  }
  render() {
    return (
      <div className="title">
        <Button
          class="button-blue"
          text={this.props.btntext}
          btnpath={this.props.btnpath}
          btnClick={this.btnClick}
        />
        <h1>Lango!</h1>
      </div>
    );
  }
}

class Button extends React.Component {
  btnClickAdd() {
    browserHistory.push("/add");
  }
  btnClickReview() {
    browserHistory.push("/start_review");
  }

  render() {
    console.log(this.props.btnpath);
    return (
      <div
        className={this.props.class}
        onClick={
          this.props.click
            ? this.props.click
            : this.props.btnpath === "add"
            ? this.btnClickAdd
            : this.btnClickReview
        }
      >
        <p>{this.props.text}</p>
      </div>
    );
  }
}

class Correct extends React.Component {
  render() {
    return (
      <div className="correct">
        <p>CORRECT!</p>
      </div>
    );
  }
}

class Wrong extends React.Component {
  render() {
    return <p>{this.props.input}</p>;
  }
}

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <p>{this.props.username}</p>
      </div>
    );
  }
}

class Google extends React.Component {
  render() {
    return (
      <a href={"/auth/google"} className="google">
        <img src="./assets/google.jpg" />
        <p>Log in with Google</p>
      </a>
    );
  }
}

class CardInput extends React.Component {
  render() {
    return (
      <fieldset>
        <input
          name={this.props.name}
          id={this.props.id}
          type={this.props.type || "text"}
          placeholder={this.props.placeholder}
          required
        />
      </fieldset>
    );
  }
}

// React component for textarea
class CardTextarea extends React.Component {
  render() {
    return (
      <fieldset>
        <textarea
          name={this.props.name}
          id={this.props.id}
          placeholder={this.props.placeholder}
          required
        />
      </fieldset>
    );
  }
}

// React component for the front side of the card
class CardFront extends React.Component {
  render(props) {
    return (
      <div className="card-side side-front">
        <div className="card-side-container">
          <div className="refresh">
            <img src="./assets/noun_Refresh_2310283.svg" />
          </div>
          <p>{this.props.text}</p>
        </div>
      </div>
    );
  }
}

// React component for the back side of the card
class CardBack extends React.Component {
  render(props) {
    console.log("Here", this.props.correct);
    return (
      <div className="card-side side-back">
        <div className="card-side-container">
          {/* <h2 id="congrats">{this.props.text}</h2> */}
          <div className="refresh">
            <img src="./assets/noun_Refresh_2310283.svg" />
          </div>
          {this.props.correct ? <Correct /> : <p>{this.props.text}</p>}
        </div>
      </div>
    );
  }
}

// React component for the card (main component)
class Card extends React.Component {
  constructor(props) {
    super(props);
    this.correct = false;
    this.state = {
      flipped: false
    };
    this.flip = this.flip.bind(this);
  }

  flip = () => {
    if (userInput === cards[index].english) {
      this.correct = true;
    }
    console.log(this.correct);
    this.setState({ flipped: !this.state.flipped });
  };
  render() {
    // this.componentDidMount();
    return (
      <div
        onClick={this.flip}
        className={"card-container" + (this.state.flipped ? " flipped" : "")}
      >
        {/* <div className="card-container"> */}
        <div className="card-body">
          <CardBack text={this.props.text} correct={this.correct} />

          <CardFront text={this.props.text} />
        </div>
      </div>
    );
  }
}

class StartReview extends React.Component {
  constructor(props) {
    super(props);
    this.cur_card_text = "";
    this.cards = [];
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      clicks: 0,
      show: true,
    };
  }

  componentDidMount() {
    //  window.addEventListener('load', renderStartReview);
    // this.cards = renderStartReview();
    // this.cards
    // fetch('/startreview')
    //   .then(response => response.json())
    //   .then(data => this.setState({ hits: data.hits }));

    fetch("/startreview")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result,
            clicks: 0
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error,
            clicks: 0
          });
        }
      );
    // this.cards = renderStartReview();
    // cards = [
    //   {
    //     googleID: "2",
    //     english: "hello",
    //     spanish: "Hola",
    //     seen: 0,
    //     correct: 0
    //   },
    //   {
    //     googleID: "2",
    //     english: "bye",
    //     spanish: "Adios",
    //     seen: 0,
    //     correct: 0
    //   },
    //   {
    //     googleID: "2",
    //     english: "yes",
    //     spanish: "Si",
    //     seen: 0,
    //     correct: 0
    //   }
    // ];

    console.log("Whats in here", this.cards);

    // console.log(cards[0].spanish);
    // this.cur_card_text = cards[this.state.clicks].spanish;
    // console.log(typeof this.cur_card_text);
    // console.log(this.cur_card_text);

    // let username = renderUserName();
    // console.log(JSON.stringify(username));
    // console.log(username);
    // console.log(JSON.stringify(cards));
    // console.log("Hey");
  }

  IncrementItem = () => {
    console.log(this.state.clicks);
    cards[this.state.clicks].seen++;
    this.setState({ clicks: this.state.clicks + 1 });
    if (this.state.clicks >= cards.length - 1) {
      this.setState({ clicks: 0 });
    }
    console.log(this.state.clicks);
    index = this.state.clicks;
  };

  onFocus() {
    userInput = this.myInput.value;
  }

  onBlur() {
    userInput = this.myInput.value;
  }

  render() {

    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      // console.log("We are here");
      // console.log(items);
      cards = items;
      // return (

      return (
        <div className="col">
          <Title btntext="Add" btnpath="add" />
          <div className="column-container">
            <Card text={cards[index].spanish} />
            <div className="small-card">
              <input
                ref={input => {
                  this.myInput = input;
                }}
                onFocus={this.onFocus.bind(this)}
                onBlur={this.onBlur.bind(this)}
              />
            </div>
            <div className="btn-container">
              <Button
                class="button-green "
                text="Next"
                click={this.IncrementItem}
              />
            </div>
          </div>
          <Footer username="Daniel" />
        </div>
      );
    }
  }
}

class AddPage extends React.Component {
  render() {
    return (
      <div className="col">
        <Title btntext="Start Review" btnpath="review" />
        {/* <Button class="button-blue" text="Add" /> */}
        <div className="column-container">
          <div className="row-container">
            <div className="medium-card">
              <input id="myWord" onKeyPress={makeCorsRequest} />
            </div>
            <div className="medium-card">
              <p id="outputGoesHere" />
            </div>
          </div>
          <div className="btn-container">
            <Button
              class="button-green "
              text="Save"
              click={makeCorsRequestStore}
            />
          </div>
        </div>
        <Footer username="Daniel" />
      </div>
    );
  }
}

class LogIn extends React.Component {
  render() {
    return (
      <div className="full-height">
        <div className="container">
          <div className="left-half ">
            <div className="text">
              <h1>Welcome to Lango!</h1>
              <p>Customize your vocabulary</p>
            </div>
          </div>
          <div className="right-half ">
            <Google />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/login" component={LogIn} />
    <Route path="/start_review" component={StartReview} />
    <Route path="/add" component={AddPage} />
    <Route path="/login/#" component={LogIn} />
    <Route path="/start_review/#" component={StartReview} />
    <Route path="/add/#" component={AddPage} />
    <Route path="*" component={StartReview} />
  </Router>,
  document.getElementById("root")
);

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
