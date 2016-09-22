import React from 'react';
import {Link} from 'react-router';
import {Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerActions from '../../actions/RegisterActions';

@connect(
  (state) => {
    return {
      user: state.auth.user,
      schools: state.register.schools,
      teachers: state.register.teachers,
    };
  },
  (dispatch) => {
    return bindActionCreators(Object.assign({}, registerActions), dispatch);
  }
)
export default class RegisterView extends React.Component {

  static propTypes = {
    /* school: React.PropTypes.string.isRequired, */
  }

  state = {
    value: "",
  }

  constructor(props) {
    super(props);
    this.handleSchoolsChange = this.handleSchoolsChange.bind(this);
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

    handleChange(e) {
      this.setState({ value: e.target.value });
    }

    handleSchoolsChange(e) {
      if (e && e.target && e.target.value) {
        this.props.registerLoadTeachers(e.target.value);
      } else {
        this.props.registerReinitTeachers();
      }
    }

    render() {
        const {schools, teachers} = this.props;

        return (
          <div>
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup controlId="formControlsSchool">
                <ControlLabel>Votre établissement cette année *</ControlLabel>
                <FormControl componentClass="select" placeholder="select" onChange={this.handleSchoolsChange}>
                  {schools.map(school => {
                    return <option key={school.id} value={school.id}>{school.name}</option>;
                  })}
                </FormControl>
              </FormGroup>

              <FormGroup controlId="formControlsSchool">
                <ControlLabel>Votre classe et professeur de Mathématiques cette année dans cet établissement *</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  {teachers.map(teacher => {
                    return <option key={teacher.id} value={teacher.id}>{teacher.firstname} {teacher.name}</option>;
                  })}
                </FormControl>
              </FormGroup>

              <Button bsStyle="primary" type="submit">Finaliser l'inscription</Button>
            </Form>
          </div>
        );
    }

}
