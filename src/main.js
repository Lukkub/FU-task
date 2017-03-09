import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import createStore from './store/createStore';
import Router from './scenes/router';

class App extends Component {
    render () {
        return (
            <Provider store={createStore()}>
                <View style={{ flex: 1 }}>
                    <StatusBar barStyle="light-content" />
                    <Router />
                </View>
            </Provider>
        );
    }
}

export default App;
