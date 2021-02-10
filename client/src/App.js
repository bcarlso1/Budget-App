import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import withContext from './Context';
import Header from './components/Header';
import NotFound from './components/NotFound';
import Budget from './components/Budget';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const HeaderWithContext = withContext(Header);
const BudgetWithContext = withContext(Budget);
const SignInWithContext = withContext(SignIn);
const SignUpWithContext = withContext(SignUp);

export default class App extends Component {

  render() {
      return (
        <BrowserRouter>
            <HeaderWithContext />
            <Switch>
                <Route exact path="/" component={SignInWithContext} />
                <Route exact path="/signup" component={SignUpWithContext} />
                <Route path="/accounts" component={BudgetWithContext} />
                {/* <Route path="/accounts/:id" component={DeleteWithContext} /> */}
                <Route component={NotFound} />
            </Switch>
        
        </BrowserRouter>
      )
  }

}