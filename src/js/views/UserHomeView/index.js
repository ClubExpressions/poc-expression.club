import React from 'react';
import {connect} from 'react-redux';
import {StudentDash, AdminDash, TeacherDash} from '../../components';
import RegisterView from '../RegisterView';

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
        <RegisterView></RegisterView>
        <AdminDash></AdminDash>
        <TeacherDash></TeacherDash>
        <StudentDash></StudentDash>
      </div>
    );
  }
}
