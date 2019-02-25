import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const SelectField = (props) => {
  const {
    onchange,
    value,
    options,
    error,
    defaultText,
    ...rest
  } = props;
  const errors = (error) ? style.error : {};

  return (
    <>
      <select {...rest} value={value} {...error} style={style.base} onChange={onchange}>
        <option value="">{defaultText}</option>
        {options.map(option => (
          <option key={option.label} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      {(error) ? <p style={{ ...errors }}>{error}</p> : ''}
    </>
  );
};
SelectField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.objectOf),
  value: PropTypes.string,
  onchange: PropTypes.func,
  error: PropTypes.string,
  defaultText: PropTypes.string,
};
SelectField.defaultProps = {
  options: [{ id: 0, value: 'select' }],
  onchange: () => {},
  value: '',
  error: 'null',
  defaultText: 'Select',
};
export default SelectField;
