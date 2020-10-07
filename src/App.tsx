import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ProductsList from './components/ProductsList';
import Product from './components/Product';
import ProductForm from './components/ProductForm';
import Container from '@material-ui/core/Container';
// import { seedProducts } from './utils/seeder';

import './App.css';

function App() {
  // To seed with dummy data, uncomment the following portion
  /* const products = seedProducts();
  console.log(products); */
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/products/add">
            <ProductForm />
          </Route>
          <Route path="/products/:id/edit">
            <ProductForm />
          </Route>
          <Route path="/products/:id">
            <Product />
          </Route>
          <Route path="/products" exact>
            <ProductsList />
          </Route>
          <Redirect exact from="/" to="/products" />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
