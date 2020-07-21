import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.generateRandomGerman = this.generateRandomGerman.bind(this);
    this.createStringFromObject = this.createStringFromObject.bind(this);
    this.state = { german: "", display: false };
  }

  createStringFromObject(obj) {
    if (obj.between == "null") {
      return (
        obj.subject +
        " " +
        obj.verb +
        " " +
        obj.between +
        " " +
        obj.object +
        "."
      );
    } else {
      return obj.subject + " " + obj.verb + " " + obj.object + ".";
    }
  }

  generateRandomGerman() {
    fetch("https://beliebigersatz.herokuapp.com/sentence")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let sentence = this.createStringFromObject(data);
        this.setState({ german: sentence, display: true });
      });

    //var realSentence = this.createStringFromObject(sentence);

    //this.setState({german: sentence, display:true});
  }

  render() {
    const randomgerman = this.state.german;
    const display = this.state.display;
    return (
      <div>
        <DisplayArea display={display} german={randomgerman} />
        <GenerateButton generateRandomGerman={this.generateRandomGerman} />
      </div>
    );
  }
}

class DisplayArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const randomgerman = this.props.german;
    const display = this.props.display;
    if (display) {
      return <div className="text">{randomgerman}</div>;
    }

    return <div className="text">Random Text Here</div>;
  }
}

class GenerateButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.generateRandomGerman();
  }

  render() {
    return (
      <button
        id="generateBtn"
        type="button"
        className="btn btn-outline-primary btn-lg btn-block active"
        onClick={this.handleClick}
      >
        Generate Random German
      </button>
    );
  }
}

export default App;
