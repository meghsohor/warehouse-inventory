import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ProductsList, Product, ProductForm, LanguageSelector } from './components';
import { Container } from './material.components';
import './i18n/i18n';

export default function App() {
  return (
    <>
      <Suspense fallback={null}>
        <LanguageSelector />

        <Container className="page-container">
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
              <Redirect to="/products" />
            </Switch>
          </Router>
        </Container>
      </Suspense>
    </>
  );
}
