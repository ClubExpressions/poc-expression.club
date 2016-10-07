import React from 'react';
import {Link} from 'react-router';
import {Jumbotron, Button} from 'react-bootstrap';
import {connect} from 'react-redux';

export default class Home extends React.Component {

    render () {
        return (
          <div>
                <Jumbotron>
                  <h1>Le Club des Expressions</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque aliquam ligula, dictum tristique ipsum suscipit ac. Sed sed neque a ligula placerat sagittis. Curabitur nec lacus vel dolor maximus convallis a et ligula. Phasellus ut lacus sem. Donec rhoncus vulputate mi a elementum. Donec varius lacus a maximus mattis. Vivamus vehicula vitae augue at bibendum.</p>
                  <p><Button bsStyle="primary">Découvrir</Button></p>
                </Jumbotron>
          </div>
        );
    }

}
