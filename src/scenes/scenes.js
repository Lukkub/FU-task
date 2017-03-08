import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';
import Routes from '../routes/index';

const createScenes = () => {
    return Routes.childRoutes.map((route) => {
        return <Scene
          key={route.path}
          component={route.component}
          title={route.title}
          {...route.sceneProps} />;
    });
};

const navigationBarStyle = {
    backgroundColor: 'white'
};

const scenes = Actions.create(
    <Scene key="app" navigationBarStyle={navigationBarStyle}>
        <Scene
          key={Routes.indexRoute.path}
          component={Routes.indexRoute.component}
          title={Routes.indexRoute.title}
          {...Routes.indexRoute.sceneProps} />
        {createScenes()}
    </Scene>
);

export default scenes;
