import React, { Component, PropTypes } from 'react';
import {Navbar, NavBrand, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AuthActions from '../actions/AuthActions';

@connect((state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
})
export default class App extends Component {
  render () {

    const {dispatch} = this.props;

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">Accueil</Link>
            </div>
            <div id="navbar">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/protected">Contenu restreint</Link></li>
                <li><Link to="/login">Se connecter</Link></li>
                {this.props.isAuthenticated
                ? <li><a href='#' onClick={() => this.props.dispatch(AuthActions.logoutAndRedirect())}>Se déconnecter</a> </li>
                : ''
                }
              </ul>
            </div>
          </div>
        </nav>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
