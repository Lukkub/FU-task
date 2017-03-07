import { CALL_API } from '../../../middleware/api';
const INCREMENT = 'INCREMENT';
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

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(increment(getState().counter))
        resolve()
      }, 400)
    })
  }
}

export const increment = (value = 1) => ({
  type: INCREMENT,
  value
})

const initialState = 0

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.value
    case COMICS_REQUEST:
        console.info(COMICS_REQUEST, action);
        return state
    case COMICS_SUCCESS:
        console.info(COMICS_SUCCESS, action);
        return state
    case COMICS_FAILURE:
        console.info(COMICS_FAILURE, action);
        return state
    default:
      return state
  }
}
