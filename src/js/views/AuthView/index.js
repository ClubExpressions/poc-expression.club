import React from 'react';
import {Link} from 'react-router';
import {Jumbotron, Button} from 'react-bootstrap';
import {connect} from 'react-redux';

export default class AuthView extends React.Component {

    render () {

        return (
          <div>
            <h1>Bienvenue au Club !</h1>
            {this.props.children}
          </div>
        );
    }
}
