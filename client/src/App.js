import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import RegisterPage from './pages/Register/RegisterPage'
import NavBar from './component/Navbar/Navbar'
import SignInPage from './pages/SignInPage/SignInPage'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
