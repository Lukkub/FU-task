import 'react-native';
import React from 'react';
import Home from '../src/components/Home/home.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <Home isPending />
      );
    expect(tree).toMatchSnapshot();
});
