class Title extends React.Component {
  render() {
    return (
      <div className="title">
        <Button class="button-blue" text="Add" />
        <h1>Lango!</h1>
      </div>
    );
  }
}

class Button extends React.Component {
  render() {
    return (
      <div className={this.props.class}>
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
      <div className="google">
        <img src="./assets/google.jpg" />
        <p>Log in with Google</p>
      </div>
    );
  }
}

class Answer extends React.Component {
  render() {
    return (
      <div className="col">
        <Title />
        {/* <Button class="button-blue" text="Add" /> */}
        <div className="column-container">
          <div className="big-card">
            <div className="refresh">
              <img src="./assets/noun_Refresh_2310283.svg" />
            </div>
            <p>{this.props.question}</p>
          </div>
          <div className="small-card">
            <p>{this.props.input}</p>
          </div>
          <div className="btn-container">
            <Button class="button-green " text="Next" />
          </div>
        </div>
        <Footer username="Daniel" />
      </div>
    );
  }
}

class FirstTime extends React.Component {
  render() {
    return (
      <div className="col">
        <Title />
        {/* <Button class="button-blue" text="Add" /> */}
        <div className="column-container">
          <div className="row-container">
            <div className="medium-card">
              <p>{this.props.question}</p>
            </div>
            <div className="medium-card">
              <p>{this.props.input}</p>
            </div>
          </div>
          <div className="btn-container">
            <Button class="button-green " text="Next" />
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
  <Answer question="Hola Como Esta?" input="Hello! How are you?" />,
  document.getElementById("root")
);
// ReactDOM.render(
//   <FirstTime question="Hola Como Esta?" input="Hello! How are you?" />,
//   document.getElementById("root")
// );
// ReactDOM.render(<LogIn />, document.getElementById("root"));
