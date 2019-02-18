import React from 'react';
import { TextField } from '../../components';

const TextFieldDemo = () => (
  <div>
    <h4>This is Disabled output</h4>
    <TextField placeholder="Disabled input" disabled />
    <h4>A Valid Input</h4>
    <TextField value="Accessible" />
    <h4>An Input with Error</h4>
    <TextField value="101" error="Could not greater than" />
  </div>
);
export default TextFieldDemo;
