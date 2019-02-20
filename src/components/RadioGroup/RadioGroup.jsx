import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  const {
    error,
    value,
    options,
    ...rest
  } = props;
  return (
    <>
      {options.map(option => (
        <div key={`label${option.label}`}>
          <input type="radio" name={options} {...rest} key={option.label} value={option.value} />
          { option.value }
        </div>
      ))}
    </>
  );
};
RadioGroup.defaultProps = {
  options: [{ id: 0, value: 'select' }],
  value: '',
  error: '',
};
RadioGroup.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.objectOf),
};
export default RadioGroup;
