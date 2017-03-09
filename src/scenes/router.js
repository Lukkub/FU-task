import React from 'react';
import { Router } from 'react-native-router-flux';
import scenes from './scenes';

const getSceneStyle = () => ({
    flex: 1,
    backgroundColor: '#000',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 5
});

const navbarStyle = {
    backgroundColor: 'black'
};

const titleStyle = {
    color: 'white'
};

export default () => (
    <Router
      scenes={scenes}
      getSceneStyle={getSceneStyle}
      navigationBarStyle={navbarStyle}
      titleStyle={titleStyle}
      leftButtonIconStyle={{ tintColor:'red' }}
  />
);
