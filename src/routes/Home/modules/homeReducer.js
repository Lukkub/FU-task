import { CALL_API } from '../../../middleware/api';
import lodash from 'lodash';

const SET_COMICS = 'SET_COMICS';
const COMICS_REQUEST = 'COMICS_REQUEST';
const COMICS_SUCCESS = 'COMICS_SUCCESS';
const COMICS_FAILURE = 'COMICS_FAILURE';

export const setComicsCollection = (data) => ({
    type: SET_COMICS,
    data
});

export const getComicsCollection = () => ({
    [CALL_API]: {
        types: [COMICS_REQUEST, COMICS_SUCCESS, COMICS_FAILURE],
        endpoint: 'comics',
        method: 'GET'
    }
});

const initialState = {
    isPending: false,
    comics: {
        id: null,
        data: null
    }
};

export default function marvel (state = initialState, action) {
    switch (action.type) {
        case COMICS_REQUEST:
            return { ...state, isPending: true };
        case COMICS_SUCCESS:
            const comics = lodash.get(action, 'response.data.results');
            console.info(COMICS_SUCCESS, comics);
            return { ...state, comics: { id: Date.now(), data: comics }, isPending: false };
        case COMICS_FAILURE:
            return { ...state, error: action.error, isPending: false };
        case SET_COMICS:
            console.info(SET_COMICS, action.data);
            return { ...state, comics: action.data };
        default:
            return state;
    }
}
