import React from 'react';

export default class AuthView extends React.Component {

    render () {

        return (
          <div>
            {this.props.children}
          </div>
        );
    }
}
