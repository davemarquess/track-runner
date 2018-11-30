import React, { Component } from 'react';
import Form from './components/Form';
import List from './components/List';
import Reset from './components/reset';
import ProgressBar from './components/ProgressBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackArr: [],
      currentText: '',
      isAuthenticated: true,
      questionIndex: 0,
      question: 'What is the name of your track?',
      responseIndex: 0,
      resultObj: {},
      fetchedTracks: [],
      fetchedTracksDisplay: [],
      areTracksFetched: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handleRetrieve = this.handleRetrieve.bind(this);
  }

  handleDeleteOption(optionToRemove) {
    let optionToRemoveOnObj = optionToRemove.match(/[^-\s]+/);
    let resultObjCopy = this.state.resultObj;
    delete resultObjCopy[optionToRemoveOnObj];
    this.setState((prevState) => ({
      trackArr: prevState.trackArr.filter((option) => optionToRemove !== option),
      resultObj: resultObjCopy
    }));
  };

  handleChange(e) {
    this.setState({
      currentText: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault(); // prevents it from reloading the page
    this.handleQuestion();
    const topics = [
      'Name',
      'BPM',
      'Genres',
      'Bass',
      'Drums',
      'Synths',
      'Mixing Plugins',
      'Mastering Plugins',
      'Other Notes'
    ];
    const trackArrCopy = this.state.trackArr.slice();
    trackArrCopy.push(topics[this.state.questionIndex] + " -  " + this.state.currentText);
    this.setState((prevState) => {
      if (prevState.responseIndex <= 9) {
        prevState.resultObj[topics[this.state.questionIndex]] = this.state.currentText;
        console.log('resultObj: ', this.state.resultObj)
        return {
          trackArr: trackArrCopy,
          currentText: '',
          resultObj: prevState.resultObj
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
      question: 'What is the name of your track?',
      responseIndex: 0,
      fetchedTracksDisplay: [],
      areTracksFetched: false
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
      'Thank you, enjoy your production!  Click \'Save\' to store your template in the database!'
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
    const resultObjCopy = this.state.resultObj;
    const { Name, BPM, Genres, Bass, Drums, Synths } = resultObjCopy;
    this.handleReset();
    fetch('http://localhost:3000/track', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        Name,
        BPM,
        Genres,
        Bass,
        Drums,
        Synths
      })
    })
      .then((data) => {
        return data.json();
      })
  }

  handleRetrieve() {
    fetch('http://localhost:3000/track', {
      method: 'GET',
    })
      .then((data) => {
        return data.json();
      }).then((objects) => {
        this.setState({
          fetchedTracks: objects
        })
      })
    const resultArr = [];
    let fetchedTracksCopy = this.state.fetchedTracks;
    let i = 0;
    fetchedTracksCopy.forEach(trackObj => {
      for (let key in trackObj) {
        resultArr.push(<p key={i++}>{key}: {trackObj[key]}</p>);
      }
    });
    this.setState({
      fetchedTracksDisplay: resultArr,
      areTracksFetched: true
    })
  }

  render() {
    return (
      <div>
        <h1 id='header'>⚡️ 👟 🎸 Track  Runner <br></br> 🎸 👟 ⚡️</h1>
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
          handleDeleteOption={this.handleDeleteOption}
          resultObj={this.state.resultObj}
        />
        <Reset
          handleReset={this.handleReset}
          handleSave={this.handleSave}
          handleRetrieve={this.handleRetrieve}
          fetchedTracksDisplay={this.state.fetchedTracksDisplay}
          areTracksFetched={this.state.areTracksFetched}
        />
        <ProgressBar
          questionIndex={this.state.questionIndex}
        />
      </div>
    )
  }
}

export default App;