import React, { Component, PropTypes } from 'react';
import {Navbar, NavBrand, Nav, NavItem} from 'react-bootstrap';
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

    const {logout, loginUserWithOAuthProvider, isAuthenticated} = this.props;

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
            {!isAuthenticated
              ? <NavItem eventKey={2} href="#" onClick={loginUserWithOAuthProvider}>Se connecter avec Facebook</NavItem>
              : ''
            }
            {isAuthenticated
              ? <NavItem eventKey={3} href='#' onClick={logout}>Se déconnecter</NavItem>
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
