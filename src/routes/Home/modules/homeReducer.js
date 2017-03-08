import { CALL_API } from '../../../middleware/api';
import lodash from 'lodash';

const COMICS_REQUEST = 'COMICS_REQUEST';
const COMICS_SUCCESS = 'COMICS_SUCCESS';
const COMICS_FAILURE = 'COMICS_FAILURE';

export const getComicsCollection = () => ({
    [CALL_API]: {
        types: [COMICS_REQUEST, COMICS_SUCCESS, COMICS_FAILURE],
        endpoint: 'comics',
        method: 'GET'
    }
});

const initialState = {};

export default function marvel (state = initialState, action) {
    switch (action.type) {
        case COMICS_REQUEST:
            return { ...state, isPending: true };
        case COMICS_SUCCESS:
            const comics = lodash.get(action, 'response.data.results');
            console.info(COMICS_SUCCESS, comics);
            return { ...state, comics, isPending: false };
        case COMICS_FAILURE:
            return { ...state, error: action.error, isPending: false };
        default:
            return state;
    }
}
