import React from 'react';
import {RoleAware} from '../../components'
import {Alert} from 'react-bootstrap';

export default class StudentDash extends RoleAware {

  constructor(props) {
    super(props);
  }

  authorizedRoles() {
    return ["students"];
  }

  render() {
    return this.renderWithRole(() => {
      return (
        <div className="studentRole">
          <Alert bsStyle="info">Je suis un composant visible uniquement par les élèves.</Alert>
        </div>
      );
    });
  }
}
