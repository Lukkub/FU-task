import HomeContainer from './containers/homeContainer';
import reducer from './modules/homeReducer';

export default {
    path: 'home',
    title: 'Home',
    component: HomeContainer,
    reducer,
    sceneProps: {
        hideNavBar: false
    }
};
