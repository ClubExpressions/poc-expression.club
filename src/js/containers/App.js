import React, { Component, PropTypes } from 'react';
import { Navbar, NavBrand, Nav, NavItem, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {  Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/AuthActions';

@connect(
  (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      isLoading: state.auth.isLoading,
      user: state.auth.user
    };
  },
  (dispatch) => {
    return bindActionCreators(Object.assign({}, authActions), dispatch);
  }
)
export default class App extends Component {

  constructor(props) {
    super(props);
    this.props.loadUserIfPossible();
  }

  render () {

    const {logoutAndRedirect, loginUserWithOAuthProvider, isAuthenticated, user} = this.props;

    const homeLink = isAuthenticated ? `/users/${user.id}` : "/";

    let displayedUserName;
    if (user && user.name && user.firstname) {
      displayedUserName = user.firstname + ' ' + user.name;
    } else if (user && 'admin' === user.id) {
      displayedUserName = 'Admin';
    } else {
      displayedUserName = "Anonyme";
    }

    return (
      <div>
        <Modal show={this.props.isLoading} bsSize="small">
          <Modal.Body>
            <b>Connexion ...</b>
          </Modal.Body>
        </Modal>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to={homeLink}>Accueil</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            {isAuthenticated
              ? <NavItem eventKey={2} href="#">Mon profil ({displayedUserName})</NavItem>
              : ''
            }

            {isAuthenticated
              ? <NavItem eventKey={1} href='#' onClick={logoutAndRedirect}>Quitter le Club</NavItem>
              : <NavItem eventKey={1} href="#" onClick={loginUserWithOAuthProvider}>Entrer ou s'inscrire au Club</NavItem>
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
