import React from 'react';
import {connect} from 'react-redux';
import {StudentDash, AdminDash, TeacherDash} from '../../components';

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
        <TeacherDash></TeacherDash>
        <StudentDash></StudentDash>
      </div>
    );
  }
}
