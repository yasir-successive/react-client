import React from 'react';
import propTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const { error,onChange, ...rest } = props;
  const redError = (error) ? style.error : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...style.base, ...redError, color: style.base.color }} onChange= {onChange}/>
      {(error !== ' ') ? <info style={{ color: 'red' }}>{error}</info> : ''}
    </>
  );
};
TextField.defaultProps = {
  error: null,
};
TextField.propTypes = {
  error: propTypes.string,
  value: propTypes.string.isRequired,
  onChange: propTypes.func,
};
export default TextField;
