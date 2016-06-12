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
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link className="navbar-brand" to="/">Accueil</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1}><Link to="/protected">Contenu restreint</Link></NavItem>
            <NavItem eventKey={2}><Link to="/login">Se connecter</Link></NavItem>
            {this.props.isAuthenticated
              ? <NavItem eventKey={3} href='#' onClick={() => this.props.dispatch(AuthActions.logoutAndRedirect())}>Se déconnecter</NavItem>
              : ''
            }
          </Nav>
        </Navbar>
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
