import { connect } from 'react-redux';
import { getComicsCollection } from '../modules/homeReducer';
import Home from '../../../components/Home/home';

const mapActionCreators = {
    getComicsCollection
};

const mapStateToProps = (state) => ({
    isPending: state.marvel.isPending,
    comics: state.marvel.comics
});

export default connect(mapStateToProps, mapActionCreators)(Home);
