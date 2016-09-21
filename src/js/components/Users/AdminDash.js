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
          <p>Je suis un composant visible uniquement par les admins.</p>
        </div>
      );
    });
  }
}
