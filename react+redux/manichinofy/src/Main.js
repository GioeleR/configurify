import 'bootstrap/css/bootstrap.css!';

import React from "react";
import { Provider } from 'react-redux';
import Reducers from 'src/Reducers';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import Container from "src/components/Container";

const logger = createLogger({
  level: 'debug'
});

const createStoreWithMiddleware = applyMiddleware(
  logger
)(createStore);

let store = createStoreWithMiddleware(Reducers);

React.render(
  <Provider store={store}>{() => <Container/>}</Provider>, document.getElementById('wrapper')
);