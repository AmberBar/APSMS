import React from 'react';
import { Router, Route, Switch , Redirect} from 'dva/router';
import LoginApsms from './routes/LoginApsms';
import dynamic from 'dva/dynamic'
import app from './index'

function RouterConfig({ history}) {
    const routes = [{
      path: `/apsms`,
      model: () => [import('./models/login')],
      component: () => import('./routes/LoginApsms'),
    }]
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact render={() => (<Redirect to="/apsms" />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route
                exact
                key={key}
                path={path}
                component={dynamic({ app, ...dynamics })}
              />
            ))
          }
          {/* <Route component={error} /> */}
          {/* <Route path="/apsms" exact component={LoginApsms} /> */}
        </Switch>
      </Router>
    )

  // return (
  //   <Router history={history}>
  //     <Switch>
  //       {/* <Route path="/" exact component={IndexPage} /> */}
  //       <Route path="/apsms" exact component={LoginApsms} />
  //     </Switch>
  //   </Router>
  // );
}

export default RouterConfig;
