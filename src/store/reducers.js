import routes from '../routes';

const reducers = {};
const combineRoutes = routes.childRoutes.concat(routes.indexRoute);
combineRoutes.map((route) => {
    if (route.reducer) {
        reducers[route.reducer.name] = route.reducer;
    }
});

export { reducers };
