import React, { Component } from 'react';
import './App.css';
import Input from './components/input/Input';
import Output from './components/output/Output';
import Button from './components/button/Button';
import { CheckBusinessHours } from './services/Services';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      inputList: [],
      outputList: [],
    };
  }

  HandleSubmit = () => {
    const currentInputValue = this.state.inputValue;
    const inBusinessHours = CheckBusinessHours(currentInputValue);

    this.setState({
      inputList: [...this.state.inputList, currentInputValue],
      outputList: [...this.state.outputList, inBusinessHours],
      inputValue: '',
    });
  }

  UpdateInput = (currentInput) => {
    this.setState({ inputValue: currentInput.target.value });
  }

  render() {
    return (
      <div className="App">
        <Input
          inputValue={this.state.inputValue}
          updateInput={this.UpdateInput}
          handleSubmit={this.HandleSubmit}
        />
        <Button
          handleSubmit={this.HandleSubmit}
        />
        <Output
          inputList={this.state.inputList}
          outputList={this.state.outputList}
        />
      </div>
    )
  }
}

export default App;