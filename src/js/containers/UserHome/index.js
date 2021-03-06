import React from 'react';
import {connect} from 'react-redux';
import {StudentDash, AdminDash, TeacherDash} from '../../components';
import Register from '../Register';

@connect(
  (state) => {
    return {
      user: state.auth.user,
    };
  },
)
export default class UserHome extends React.Component {

  render() {

    return (
      <div>
        <h1>Bienvenue au Club !</h1>
        <Register></Register>
        <AdminDash user={this.props.user}></AdminDash>
        <TeacherDash user={this.props.user}></TeacherDash>
        <StudentDash user={this.props.user}></StudentDash>
      </div>
    );
  }
}
