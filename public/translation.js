class Title extends React.Component {
  render() {
    return (
      <div className="title">
        {/* <Button class="button-blue" text="Add" /> */}
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

class Answer extends React.Component {
  render() {
    return (
      <div>
        <Button class="button-blue" text="Add" />
        <div className="column-container">
          <Title />
          <div className="big-card">
            <p>{this.props.question}</p>
          </div>
          <div className="small-card">
            <p>{this.props.input}</p>
          </div>
          <div className="btn-container">
            <Button class="button-green " text="Next" />
          </div>
          <Footer username="Daniel" />
        </div>
      </div>
    );
  }
}

class Google extends React.Component {
  render() {
    return <div className="google" />;
  }
}

class LogIn extends React.Component {
  render() {
    return (
      <div className="row-container">
        {/* <Correct />
        <Correct /> */}
        <div className=".row-col">
          <Google />
        </div>
        <div className=".row-col">
          <Correct />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Answer question="Hola Como Esta?" input="Hello! How are you?" />,
  document.getElementById("root")
);
// ReactDOM.render(<LogIn />, document.getElementById("root"));
