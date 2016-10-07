import React from 'react';
import {RoleAware} from '../../components';
import {Alert} from 'react-bootstrap';

export default class AdminDash extends RoleAware {

  constructor(props) {
    super(props);
  }

  authorizedRoles() {
    return ["admin"];
  }

  render() {
    return this.renderWithRole(() => {
      return (
        <div className="adminRole">
          <Alert bsStyle="info">Je suis un composant visible uniquement par les admins.</Alert>
        </div>
      );
    });
  }
}
