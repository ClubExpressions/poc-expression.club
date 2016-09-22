import React from 'react';
import {connect} from 'react-redux';
import {StudentDash, AdminDash, TeacherDash} from '../../components';
import {Modal, Button} from 'react-bootstrap';
import RegisterView from '../RegisterView';

@connect(
  (state) => {
    return {
      user: state.auth.user,
    };
  },
)
export default class UserHomeView extends React.Component {

  state = {
    showRegisteringModal: !this.props.user.registered
                          && this.props.user.groups.indexOf("students") > -1,
  }

  render() {

    return (
      <div>
        <Modal show={this.state.showRegisteringModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
          <Modal.Header>
            <Modal.Title id="contained-modal-title-lg">Finalisation de l'inscription</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegisterView></RegisterView>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>

        <h1>Bienvenue au Club !</h1>
        <AdminDash></AdminDash>
        <TeacherDash></TeacherDash>
        <StudentDash></StudentDash>
      </div>
    );
  }
}
