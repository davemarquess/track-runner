import React, { Component } from 'react';
import Form from './components/Form';
import List from './components/List';
import Reset from './components/reset';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackArr: ['145bpm', '808', 'Omnisphere2'],
      currentText: '',
      isAuthenticated: true,
      questionIndex: 0,
      question: 'Select a bpm (beats per minute)'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);
  }

  handleChange(e) {
    this.setState({
      currentText: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault(); // prevents it from reloading the page
    this.handleQuestion();
    const trackArrCopy = this.state.trackArr.slice();
    trackArrCopy.push(this.state.currentText);
    this.setState({
      trackArr: trackArrCopy,
      currentText: '',
    });
    e.target.reset();
  }

  handleReset() {
    this.setState({
      trackArr: [],
      questionIndex: 0,
      question: 'Select a bpm (beats per minute)'
    });
    console.log(this.state)
  }

  handleQuestion() {
    const questionArr = [
      'What genres would you like to create?',
      'Choose a bass instrument',
      'Select a drum rack',
      'What synths would you like to use?',
      'What plugins would you like to use for Mixing?',
      'Lastly, what plugins will you be using for Mastering?'
    ];

    this.setState((prevState) => {
      return {
        questionIndex: prevState.questionIndex + 1,
        question: questionArr[this.state.questionIndex]
      };
    });

  }

  // handleSave() {

  // }

  render() {

    return (
      <div>
        <h1 id='header'>⚡️ 👟 🎸 Track Runner 🎸 👟 ⚡️</h1>

        <Form
          handleQuestion={this.handleQuestion}
          question={this.state.question}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          currentText={this.state.currentText}
        />
        <List
          trackArr={this.state.trackArr}
          isAuthenticated={this.state.isAuthenticated}
        />
        <Reset handleReset={this.handleReset} />
      </div>
    )
  }
}

export default App;