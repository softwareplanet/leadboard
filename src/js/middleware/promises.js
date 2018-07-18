const middleware = store => next => action => {
  console.log('promise:' + action.promise);
  if (action.type !== 'PROMISE') {
    return next(action);
  }

  const [startAction, successAction, failureAction] = action.actions;
  store.dispatch({
    type: startAction
  });

  // data: data == data
  action.promise.then((data) => {
      store.dispatch({
        type: successAction,
        data: data.resource
      }), (error) => store.dispatch({
        type: failureAction,
        error: error
      })
  });
};

export default middleware;
