import React from 'react';

export default class RoleAware extends React.Component {

  constructor(props) {
    super(props);
  }

  renderWithRole(render) {
    if (typeof this.authorizedRoles === "function"
      && this.checkIntersectionNotEmpty(this.authorizedRoles(), this.props.user.groups)) {
      return render();
    } else {
      return null;
    }
  }

  checkIntersectionNotEmpty(a1, a2) {
    return a1.filter(elt => a2.indexOf(elt) !== -1).length !== 0;
  }
}
