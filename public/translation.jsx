import {
  makeCorsRequest,
  makeCorsRequestStore,
  renderStartReview,
  renderUserName,
  seenIncrementClient
} from "./makeRequest.js";

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

let cards = [];
let isCorrect = false;
// let index = 0;
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
    if (userInput === cards[this.props.index].english) {
      this.correct = true;
      cards[this.props.index].correct++;
    }
    console.log(this.correct);
    isCorrect = this.correct;
    this.setState({ flipped: !this.state.flipped });
  };
  render() {
    return (
      <div
        onClick={this.flip}
        className={"card-container" + (this.state.flipped ? " flipped" : "")}
      >
        <div className="card-body">
          <CardBack
            text={cards[this.props.index].english}
            correct={this.correct}
          />

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
      show: true
    };
  }

  componentDidMount() {
    /*
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
        error => {
          this.setState({
            isLoaded: true,
            error,
            clicks: 0
          });
        }
      );
      */

    Promise.all([
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
          error => {
            this.setState({
              isLoaded: true,
              error,
              clicks: 0
            });
          }
        ),
      fetch("/getusername")
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              nameLoaded: true,
              username: result,
              clicks: 0
            });
          },
          error => {
            this.setState({
              nameLoaded: true,
              error,
              // username: "Daniel",
              clicks: 0
            });
          }
        )
    ]);

    /*
    cards = [
      {
        googleID: "2",
        english: "hello",
        spanish: "Hola",
        seen: 0,
        correct: 0
      },
      {
        googleID: "2",
        english: "bye",
        spanish: "Adios",
        seen: 0,
        correct: 0
      },
      {
        googleID: "2",
        english: "yes",
        spanish: "Si",
        seen: 0,
        correct: 0
      }
    ];
    */
  }

  IncrementItem = () => {
    console.log(this.state.clicks);
    cards[this.state.clicks].seen++;
    seenIncrementClient(
      this.state.clicks,
      isCorrect,
      cards[this.state.clicks].seen
    );

    this.setState({ clicks: this.state.clicks + 1 });
    if (this.state.clicks >= cards.length - 1) {
      this.setState({ clicks: 0 });
    }

    console.log(this.state.clicks);
    isCorrect = false;
  };

  onFocus() {
    userInput = this.myInput.value;
  }

  onBlur() {
    userInput = this.myInput.value;
  }

  render() {
    const { error, isLoaded, nameLoaded, items, username } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded || !nameLoaded) {
      return <div>Loading...</div>;
    } else {
      // console.log("We are here");
      console.log(items);
      console.log("UserName", username);
      cards = items;

      // console.log(cards[0].spanish);
      // console.log(cards[0].id); 

      return (
        <div className="col">
          <Title btntext="Add" btnpath="add" />
          <div className="column-container">
            <Card
              text={cards[this.state.clicks].spanish}
              index={this.state.clicks}
            />
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
          <Footer username={username} />
        </div>
      );
    }
  }
}

class AddPage extends React.Component {
  componentDidMount() {
    Promise.all([
      fetch("/getusername")
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              nameLoaded: true,
              username: result,
              clicks: 0
            });
          },
          error => {
            this.setState({
              nameLoaded: true,
              error,
              // username: "Daniel",
              clicks: 0
            });
          }
        )
    ]);
  }
  render() {
    const { error, isLoaded, nameLoaded, items, username } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!nameLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="col">
          <Title btntext="Start Review" btnpath="review" />
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
          <Footer username={username} />
        </div>
      );
    }
    
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
