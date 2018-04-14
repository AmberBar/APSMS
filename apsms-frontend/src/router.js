// import React from 'react';
// import { Router, Route, Switch , Redirect} from 'dva/router';
// import dynamic from 'dva/dynamic'
// import app from './index'
import { Router} from 'dva/router';
import React from 'react'
// import modelExtend from 'dva-model-extend'
import { Route, Switch, Redirect } from 'react-router-dom'
import dynamic from 'dva/dynamic'
import {app} from './index'

function RouterConfig({ history}) {
    console.log("************app****************")
    console.log(app)
    const routes = [
      {
        path: `/register`,
        models: () => [import('./models/register')],
        component: () => import('./routes/RegisterUser'),
      }
      ,
      {
        path: `/apsms`,
        models: () => [import('./models/login')],
        component: () => import('./routes/LoginApsms'),
      }
    ]
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
