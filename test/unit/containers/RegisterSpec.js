import { renderComponent, expect, requireWithMock, renderRawShallowComponent, sinon } from '../testHelper';
const Register = requireWithMock('../../../src/js/containers/Register', 'Register');
import config from '../../../src/js/utils/config';

describe("Register", () => {

  let registerLoadSchools;

  beforeEach(() => {
    registerLoadSchools = sinon.spy();
  });

  afterEach(() => {
    registerLoadSchools.reset();
  });

  describe("Initializing", () => {

    function checkOpen(props, status) {
      // console.log("Props: ", props);
      let component = renderRawShallowComponent(Register, props);

      expect(props.registerLoadSchools.calledOnce).to.equal(true);

      expect(component.find('Modal').props().show).to.equal(status);
    }

    it('modal shouldn\'t be opened when user is an admin', () => {
      let user = {
        groups: ['admin'],
      };

      let props = {
        registerLoadSchools,
        user,
        schools: [],
        teachers: [],
      };
      checkOpen(props, false);
    });

    it('modal shouldn\'t be opened when user is a teacher', () => {
      let user = {
        groups: ['teachers'],
      };

      let props = {
        registerLoadSchools,
        user,
        schools: [],
        teachers: [],
      };
      checkOpen(props, false);
    });

    it('modal shouldn\'t be opened when user is a student and has a school year equals to the configured year', () => {
      let user = {
        groups: ['students'],
        schoolYears: {},
      };
      user.schoolYears[config.currentSchoolYear] = {};

      let props = {
        registerLoadSchools,
        user,
        schools: [],
        teachers: [],
      };
      checkOpen(props, false);
    });

    it('modal should be opened when user hasn\'t a school year', () => {
      let user = {
      };
      let props = {
        registerLoadSchools,
        user,
        schools: [],
        teachers: [],
      };
      checkOpen(props, true);
    });

    it('modal should be opened when user has an empty school year', () => {
      let user = {
        schoolYears: {},
      };
      let props = {
        registerLoadSchools,
        user,
        schools: [],
        teachers: [],
      };
      checkOpen(props, true);
    });

    it('modal should be opened when user has a school year, but not equals to the configured year', () => {
      let user = {
        schoolYears: {},
      };
      user.schoolYears[config.currentSchoolYear - 1] = {};

      let props = {
        registerLoadSchools,
        user,
        schools: [],
        teachers: [],
      };
      checkOpen(props, true);
    });

  });

});
