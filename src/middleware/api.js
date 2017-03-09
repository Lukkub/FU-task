import md5 from 'crypto-js/md5';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'CALL_API';

// API configuration
const API_KEY_PUB = '84ab050b53b4c960b284f0b21ab387c4';
const API_KEY_PRIV = 'af3457bd154f5156ec228ccd75f6863f57eeebc3';
const API_ROOT = 'https://gateway.marvel.com:443/v1/public/';
const debug = false;

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') return next(action);

    let { endpoint } = callAPI;
    const { method, types, data } = callAPI;

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }

    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    function actionWith (data) {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
    }

    const [requestType, successType, failureType] = types;
    next(actionWith({ type: requestType }));

    function callApi (endpoint, method = 'GET', body) {
        const timeStamp = Date.now();
        const ts = '?ts=' + timeStamp;
        const apiKey = '&apikey=' + API_KEY_PUB;
        const hash = '&hash=' + md5(timeStamp + API_KEY_PRIV + API_KEY_PUB);
        const fullUrl = API_ROOT + endpoint + ts + apiKey + hash;

        if (debug) console.log('[API] call', fullUrl, body);

        return fetch(fullUrl, { method, body })
            .then(response =>
                response.json().then(json => {
                    if (!response.ok) {
                        if (debug) console.log('[API] rejected response ', fullUrl, json);

                        return Promise.reject(json);
                    }

                    if (debug) console.log('[API] response from ' + fullUrl, json);

                    return Object.assign({}, json);
                })
            );
    }

    return callApi(endpoint, method, data).then(
        response => next(actionWith({
            response,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || 'Something bad happened'
        }))
    );
};
