import React from 'react';
import {connect} from 'react-redux';
import {RoleAware} from '../../components'

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
          <p>Je suis un composant visible uniquement par les profs.</p>
        </div>
      );
    });
  }
}
