import React from 'react';
import { Link } from 'react-router';
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, Alert } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as registerActions from '../../actions/RegisterActions';
import * as authActions from '../../actions/AuthActions';
import config from '../../utils/config';
import { push } from 'react-router-redux';

@connect(
  (state) => {
    return {
      user: state.auth.user,
      schools: state.register.schools,
      teachers: state.register.teachers,
    };
  },
  (dispatch) => {
    return {
      ...bindActionCreators(Object.assign({}, authActions), dispatch),
      ...bindActionCreators(Object.assign({}, registerActions), dispatch),
    };
  }
)
export default class Register extends React.Component {

  static propTypes = {
    /* school: React.PropTypes.string.isRequired, */
  }

  state = {
    name: '',
    firstname: '',
    showRegisteringModal: this.showRegisteringModal(),
    schoolId: '',
    teacherId: '',
    saving: false,
  }

  constructor(props) {
    super(props);
    this.handleSchoolsChange = this.handleSchoolsChange.bind(this);
    this.showRegisteringModal = this.showRegisteringModal.bind(this);
    this.close = this.close.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.handleTeachersChange = this.handleTeachersChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
  };

  componentWillMount() {
    this.props.registerLoadSchools();
  }

  getValidationState() {
    // const length = this.state.value.length;
    // if (length > 10) return 'success';
    // else if (length > 5) return 'warning';
    // else if (length > 0) return 'error';
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleFirstnameChange(e) {
    this.setState({ firstname: e.target.value });
  }

  handleSchoolsChange(e) {
    if (e && e.target && e.target.value) {
      let schoolId = e.target.value;
      this.setState({ schoolId: schoolId });
      this.props.registerLoadTeachers(schoolId);
    } else {
      this.props.registerReinitTeachers();
    }
  }

  handleTeachersChange(e) {
    if (e && e.target && e.target.value) {
      let teacherId = e.target.value;
      this.setState({ teacherId: teacherId });
    }
  }

  close() {
    this.setState({showRegisteringModal: false});
    this.props.logoutAndRedirect();
  }

  saveUser() {
    this.setState({saving: true});
    let user = {
      ...this.props.user,
      name: this.state.name,
      firstname: this.state.firstname,
      schoolYears: {}
    };
    user.schoolYears[config.currentSchoolYear] = {
      school: this.props.schools.find(school => school.id === this.state.schoolId),
      teacher: this.props.teachers.find(teacher => teacher.id === this.state.teacherId),
    };
    this.props.registerSaveUser(user, () => this.setState({showRegisteringModal: false}));
  }

  showRegisteringModal() {
    return this.props.user
      && this.props.user.groups.indexOf("students") > -1
      && !(
        this.props.user.hasOwnProperty('schoolYears')
        && this.props.user.schoolYears.hasOwnProperty(config.currentSchoolYear)
      );
  }

  render() {
    const {schools, teachers} = this.props;

    return (
      <Modal
        show={this.state.showRegisteringModal}
        onHide={this.close}
        backdrop="static"
        bsSize="large"
        aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Finalisation de l'inscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Votre profil est incomplet, merci de compléter les informations suivantes.</h2>
          <h3><Alert bsStyle="warning">Vous ne pourrez pas utiliser le Club des Expressions
          tant que votre profil ne sera pas complet.</Alert></h3>
          <Form>
            <FormGroup
              controlId="FormControlName"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Votre nom *</ControlLabel>
              <FormControl
                type="text"
                placeholder="Votre nom"
                onChange={this.handleNameChange}
              />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup
              controlId="FormControlFirstName"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Votre prénom *</ControlLabel>
              <FormControl
                type="text"
                placeholder="Votre prénom"
                onChange={this.handleFirstnameChange}
              />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup controlId="formControlsSchool">
              <ControlLabel>Année scolaire {config.currentSchoolYearLabel} - Votre établissement *</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={this.handleSchoolsChange}>
                {schools.map(school => {
                  return <option key={school.id} value={school.id}>{school.name}</option>;
                })}
              </FormControl>
            </FormGroup>

            <FormGroup controlId="formControlsSchool">
              <ControlLabel>Année scolaire {config.currentSchoolYearLabel} - Votre classe et professeur de Mathématiques dans cet établissement *</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={this.handleTeachersChange}>
                {teachers.map(teacher => {
                  return <option key={teacher.id} value={teacher.id}>{teacher.firstname} {teacher.name}</option>;
                })}
              </FormControl>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Annuler</Button>
          <Button bsStyle="primary" onClick={this.saveUser}>
            {this.state.saving
              ? "Finalisation..."
              : "Finaliser l'inscription"
            }
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
