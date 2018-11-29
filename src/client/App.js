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
      question: 'What is your name?',
      responseIndex: 0
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
    const topics = [
      'Name: ',
      'BPM: ',
      'Genres: ',
      'Bass: ',
      'Drums: ',
      'Synths: ',
      'Mixing Plugins: ',
      'Mastering Plugins: ',
      'Other Notes: '
    ];
    const trackArrCopy = this.state.trackArr.slice();
    trackArrCopy.push(topics[this.state.questionIndex] + this.state.currentText);

    this.setState((prevState) => {
      if (prevState.responseIndex <= 9) {
        return {
          trackArr: trackArrCopy,
          currentText: '',
        }
      } else {
        return {
          trackArr: prevState.trackArr,
          currentText: ''
        }
      }
    });
    e.target.reset();
  }

  handleReset() {
    this.setState({
      trackArr: [],
      questionIndex: 0,
      question: 'What is your name?',
      responseIndex: 0
    });
  }

  handleQuestion() {
    const questionArr = [
      'Select a bpm (beats per minute)',
      'What genres would you like to create?',
      'Choose a bass instrument',
      'Select a drum rack',
      'What synths would you like to use?',
      'What plugins would you like to use for Mixing?',
      'What plugins will you be using for Mastering?',
      'Lastly, please add any final notes to include in your production!',
      'Thank you, enjoy your production!  Press \'Save\' to save your template in database!'
    ];

    this.setState((prevState) => {
      if (prevState.questionIndex === 9) prevState.questionIndex -= 1;
      return {
        questionIndex: prevState.questionIndex + 1,
        question: questionArr[this.state.questionIndex],
        responseIndex: prevState.responseIndex + 1
      };
    });
  }

  handleSave() {
    const countCopy = this.state.count;
    fetch('http://localhost:3000/counter', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        count: countCopy
      })
    })
      .then((data) => {
        return data.json();
      })
      .then((newCount) => {
        // console.log(newCount);
        const arrCopy = this.state.arr.slice();
        arrCopy.push(newCount.count);
        this.setState({
          arr: arrCopy
        });
      });
  }

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
        <Reset
          handleReset={this.handleReset}
          handleSave={this.handleSave}
        />
      </div>
    )
  }
}

export default App;