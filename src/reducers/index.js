import updateApp from './app';

const reducer = (state, action) => {
  return {
    app: updateApp(state, action),
  };
};

export default reducer;
