import React from 'react';
import propTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const { error, ...rest } = props;
  const redError = (error) ? style.error : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...style.base, ...redError, color: style.base.color }} />
      {(error !== ' ') ? <info style={{ color: 'red' }}>{error}</info> : ''}
    </>
  );
};
TextField.defaultProps = {
  error: null,
};
TextField.propTypes = {
  error: propTypes.string,
};
export default TextField;
