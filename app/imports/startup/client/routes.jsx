// this is route file here we declare all the routes for our application

import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { AppLayout } from '../../ui/layouts/app_layout'
import ProductsList from '../../ui/containers/products/product-list.jsx'
import ProductDetail from '../../ui/containers/product/product-detail.jsx'
import CartList from '../../ui/containers/carts/cart-list.jsx'

export const renderRoutes = () => (
    <Router history={browserHistory}>
      <Route path="/" component={AppLayout}>
          <IndexRoute component={ ProductsList } />
          <Route path="/products" components={ProductsList} />
          <Route path="/products/:id" components={ProductDetail} />
          <Route path="/cart" components={CartList} />
      </Route>
    </Router>
);
