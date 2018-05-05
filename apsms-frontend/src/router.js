import { Router} from 'dva/router';
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import dynamic from 'dva/dynamic'
import {app} from './index'

function RouterConfig({ history}) {
    const routes = [
      {
        path: `/register`,
        models: () => [import('./models/register')],
        component: () => import('./routes/RegisterUser'),
      }
      ,
      {
        path: `/login`,
        models: () => [import('./models/login')],
        component: () => import('./routes/LoginApsms'),
      },
      {
        path: `/apsms`,
        models: () => [import('./models/apsms')],
        component: () => import('./routes/Apsms'),
      }
      ,
      {
        path: `/users`,
        models: () => [import('./models/user')],
        component: () => import('./routes/UserCrud'),
      }
      ,
      {
        path: `/goods`,
        models: () => [import('./models/Goods/goods')],
        component: () => import('./routes/Goods/Goods'),
      }
      ,
      {
        path: `/goods/create`,
        models: () => [import('./models/Goods/goods')],
        component: () => import('./routes/Goods/CreateGoods'),
      }
      ,
      {
        path: `/goods/edit`,
        models: () => [import('./models/Goods/goods')],
        component: () => import('./routes/Goods/EditGoods'),
      }
      ,
      {
        path: `/apsms/detail`,
        models: () => [import('./models/Goods/goods_detail')],
        component: () => import('./routes/Goods/GoodsDetail'),
      }
      ,
      {
        path: `/order/confirm`,
        models: () => [import('./models/Order/order_confirm')],
        component: () => import('./routes/Order/OrderConfirm'),
      }
      ,
      {
        path: `/personal/information`,
        models: () => [import('./models/PersonalCenter/information')],
        component: () => import('./routes/PersonalCenter/Information'),
      }
      ,
      {
        path: `/orders`,
        models: () => [import('./models/Order/orders')],
        component: () => import('./routes/Order/orders'),
      }
      ,
      {
        path: `/shoppingCart`,
        models: () => [import('./models/Order/shopping_cart')],
        component: () => import('./routes/Order/ShoppingCart'),
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
}

export default RouterConfig;
