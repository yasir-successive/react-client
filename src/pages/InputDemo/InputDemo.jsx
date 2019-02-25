import React, { Component } from 'react';
import * as yup from 'yup';
import style from './style';
import {
  TextField,
  SelectField,
  RadioGroup,
  Button,
} from '../../components';
import {

  cricketOptions,
  footBallOptions,
  sportsArray,
  FOOTBALL,
  CRICKET,
} from '../../configs/constants';

const schema = yup.object({
  value: yup
    .string().min(3)
    .required()
    .label('Name'),
  sport: yup
    .string()
    .required()
    .label('sport'),
  CRICKET: yup
    .string().label('What you do')
    .when('sport', {
      is: val => val === 'CRICKET',
      then: yup.string().required(),
      otherwise: yup.string().min(0),
    }),
  FOOTBALL: yup
    .string().label('What you do')
    .when('sport', {
      is: val => val === 'FOOTBALL',
      then: yup.string().required(),
      otherwise: yup.string().min(0),
    }),
});

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      sport: '',
      CRICKET: '',
      FOOTBALL: '',
      errors: {},
      touch: {},
    };
  }

  handleBlur = field => () => {
    const { touch } = this.state;
    touch[field] = true;

    this.setState({
      touch,
    }, () => this.handleValidate());
  }

handleValidate = () => {
  const parsedErrors = {};
  const {
    value,
    sport,
  } = this.state;

  schema.validate({
    value,
    sport,
    FOOTBALL,
    CRICKET,
  }, { abortEarly: false })
    .then(() => {
      this.setState({
        errors: parsedErrors,
      });
    })
    .catch((errors) => {
      errors.inner.forEach((error) => {
        parsedErrors[error.path] = error.message;
      });
      this.setState({
        errors: parsedErrors,
      });
    });
}

isTouched = () => {
  const { touch } = this.state;
  return Object.keys(touch).length !== 0;
}

  getError = (field) => {
    const { errors, touch } = this.state;

    if (!touch[field]) {
      return null;
    }
    return errors[field] || '';
  }

  hasErrors = () => {
    const { errors } = this.state;
    return Object.keys(errors).length !== 0;
  }

  handleNameChange = (event) => {
    this.setState({
      value: event.target.value,
    }, () => this.handleValidate());
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
            onBlur={this.handleBlur('CRICKET')}
            error={this.getError('CRICKET')}
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
            onBlur={this.handleBlur('FOOTBALL')}
            error={this.getError('FOOTBALL')}
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
          <TextField
            value={value}
            onChange={this.handleNameChange}
            onBlur={this.handleBlur('value')}
            error={this.getError('value')}
          />
          <h3>Select the game you play</h3>
          <SelectField
            value={sport}
            onchange={this.handleSportsChange}
            options={sportsArray}
            onBlur={this.handleBlur('sport')}
            error={this.getError('sport')}
          />
          {this.renderCRICKET()}
          {this.renderFOOTBALL()}
          <div style={style.base}>
            <Button value="Cancel" onClick={() => {}} />
            <Button
              value="Submit"
              color="primary"
              disabled={this.hasErrors() || !this.isTouched()}
              style={style.active}
            />
          </div>
        </>
      );
    }
}
export default InputDemo;
