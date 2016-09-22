import React from 'react';
import {connect} from 'react-redux';
import {RoleAware} from '../../components'
import {Alert} from 'react-bootstrap';

@connect(
  (state) => {
    return {
      user: state.auth.user,
    };
  },
)
export default class TeacherDash extends RoleAware {

  constructor(props) {
    super(props);
  }

  authorizedRoles() {
    return ["teachers"];
  }

  render() {
    return this.renderWithRole(() => {
      return (
        <div className="teacherRole">
          <Alert bsStyle="info">Je suis un composant visible uniquement par les profs.</Alert>
        </div>
      );
    });
  }
}
