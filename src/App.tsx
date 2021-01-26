import React from 'react';
import './App.css';

import { Route, BrowserRouter, Switch } from 'react-router-dom'
import ApolloWrapper from './components/ApolloWrapper'
import Nav from './components/layout/Nav'

function App() {
  return (
    <BrowserRouter>
        <Nav/>
        <Switch>
            <Route exact path='/' component={ApolloWrapper}/>
          </Switch>
    </BrowserRouter>
    );
}

export default App;
