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
          <p>Je suis un composant visible uniquement par les élèves.</p>
        </div>
      );
    });
  }
}
