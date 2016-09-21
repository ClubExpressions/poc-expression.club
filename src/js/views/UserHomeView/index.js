import React from 'react';
import {connect} from 'react-redux';
import {StudentDash, AdminDash} from '../../components'

@connect(
  (state) => {
    return {
      user: state.auth.user,
    };
  },
)
export default class UserHomeView extends React.Component {

  render() {

      return (
        <div>
          <h1>Bienvenue au Club !</h1>
          <AdminDash></AdminDash>
          <StudentDash></StudentDash>
        </div>
      );
  }
}
