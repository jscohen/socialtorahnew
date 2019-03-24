import React from 'react';
import Comments from './Comments';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';

describe('Renders Component without crashing', () => {
  it('renders without crashing', () => {
    shallow(<Comments />);
  });
});
