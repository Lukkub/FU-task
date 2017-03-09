import { connect } from 'react-redux';
import ComicsView from '../../../components/Comics/comicsView';

const mapStateToProps = (state) => ({
    comics: state.marvel.comics
});

export default connect(mapStateToProps)(ComicsView);
