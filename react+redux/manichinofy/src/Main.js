import 'bootstrap/css/bootstrap.css!';

import React from "react";
import { Provider } from 'react-redux';
import Reducers from 'src/Reducers';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import MenuList from "src/components/MenuList";
import ReduxThunk from 'redux-thunk'

const logger = createLogger({
  level: 'debug'
});

const createStoreWithMiddleware = applyMiddleware(
  logger,
  ReduxThunk
)(createStore);

let store = createStoreWithMiddleware(Reducers);

React.render(
  <Provider store={store}>{() => <MenuList />}</Provider>, document.getElementById('wrapper')
);
