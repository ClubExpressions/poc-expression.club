import React, { Component, PropTypes } from 'react';
import {Navbar, NavBrand, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../actions/AuthActions';

@connect(
  (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  },
  (dispatch) => {
    return bindActionCreators(Object.assign({}, authActions), dispatch);
  }
)
export default class App extends Component {

  render () {

    const {logoutAndRedirect, loginUserWithOAuthProvider, isAuthenticated} = this.props;

    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Accueil</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <LinkContainer to="/protected">
              <NavItem eventKey={1}>Contenu restreint</NavItem>
            </LinkContainer>
            {!isAuthenticated
              ? <NavItem eventKey={2} href="#" onClick={() => loginUserWithOAuthProvider()}>Entrer ou s'inscrire au Club</NavItem>
              : ''
            }
            {isAuthenticated
              ? <NavItem eventKey={3} href='#' onClick={logoutAndRedirect}>Quitter le Club</NavItem>
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
