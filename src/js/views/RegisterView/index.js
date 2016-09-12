import React from 'react';
import {Link} from 'react-router';
import {Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Label} from 'react-bootstrap';
import {connect} from 'react-redux';

@connect(
  (state) => {
    return {
      user: state.auth.user
    };
  }
)
export default class RegisterView extends React.Component {

    getInitialState() {
      return {
        value: ''
      };
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

    render() {
        const {user} = this.props;

        return (
          <div>
            <h2>Votre profil est incomplet, merci de compléter les informations suivantes.</h2>
            <h3><Label bsStyle="warning">Vous ne pourrez pas utiliser le Club des Expressions tant que votre profil ne sera complet.</Label></h3>
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
                <ControlLabel>Sélectionnez votre établissement *</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="select">Etablissement</option>
                  <option value="other">Lycée Mandela, Nantes</option>
                </FormControl>
              </FormGroup>

              <FormGroup controlId="formControlsSchool">
                <ControlLabel>Votre professeur de Mathématiques cette année *</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="select">Professeur</option>
                  <option value="other">Christophe Gragnic</option>
                  <option value="other">Jean-Philippe Rouquès</option>
                  <option value="other">Laetitia Valade</option>
                </FormControl>
              </FormGroup>

              <Button bsStyle="primary" type="submit">Finaliser l'inscription</Button>
            </Form>
          </div>
        );
    }

}
