import { connect } from 'react-redux';
import { getComicsCollection, setComicsCollection } from '../modules/homeReducer';
import Home from '../../../components/Home/home';

const mapActionCreators = {
    getComicsCollection,
    setComicsCollection
};

const mapStateToProps = (state) => ({
    isPending: state.marvel.isPending,
    comics: state.marvel.comics
});

export default connect(mapStateToProps, mapActionCreators)(Home);
