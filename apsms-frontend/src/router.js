import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LoginApsms from './routes/LoginApsms';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/apsms" exact component={LoginApsms} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
