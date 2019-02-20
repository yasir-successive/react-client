import React, { Component } from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import {

  cricketOptions,
  footBallOptions,
  sportsArray,
  FOOTBALL,
  CRICKET,
} from '../../configs/constants';

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      sport: '',
      cricket: '',
      football: '',
    };
  }

    handleNameChange = (event) => {
      this.setState({
        value: event.target.value,
      });
    }

    handleSportsChange = (event) => {
      this.setState({
        sport: event.target.value,
      });
    }

    handlePositionChange = (event) => {
      const { sport } = this.state;
      this.setState({
        cricket: (sport === CRICKET) ? event.nativeEvent.target.value : '',
        football: (sport === FOOTBALL) ? event.nativeEvent.target.value : '',
      });
    }

    renderCRICKET=() => {
      const { sport, cricket } = this.state;
      if (sport !== CRICKET) {
        return null;
      }
      return (
        <div>
          <h4>what do you</h4>
          <RadioGroup
            value={cricket}
            options={cricketOptions}
            onChange={this.handlePositionChange}
          />
        </div>
      );
    }

    renderFOOTBALL=() => {
      const { sport, football } = this.state;
      if (sport !== FOOTBALL) {
        return null;
      }
      return (
        <div>
          <h4>what do you</h4>
          <RadioGroup
            value={football}
            options={footBallOptions}
            onChange={this.handlePositionChange}
          />
        </div>
      );
    }

    render() {
      const { value, sport } = this.state;
      console.log(this.state);
      return (
        <>
          <h3>Name</h3>
          <TextField value={value} onChange={this.handleNameChange} />
          <h3>Select the game you play</h3>
          <SelectField value={sport} onchange={this.handleSportsChange} options={sportsArray} />
          {this.renderCRICKET()}
          {this.renderFOOTBALL()}
        </>
      );
    }
}
export default InputDemo;
