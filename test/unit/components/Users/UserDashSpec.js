import { renderComponent, expect } from '../../testHelper';
import {StudentDash, AdminDash, TeacherDash} from '../../../../src/js/components';

let tested = {
  student: {
    componentObj: StudentDash,
    componentName: "StudentDash",
    group: "students",
  },
  admin: {
    componentObj: AdminDash,
    componentName: "AdminDash",
    group: "admin",
  },
  teacher: {
    componentObj: TeacherDash,
    componentName: "TeacherDash",
    group: "teachers",
  },
}

describeTest(tested.student);
describeTest(tested.admin);
describeTest(tested.teacher);

function describeTest(tested) {

  let {componentName, componentObj, group} = tested;

  let component;

  describe(componentName, () => {

    describe("when user is undefined", () => {

      it('component is not visible', () => {
        component = renderComponent(componentObj, {}, {});
        expect(component).to.not.exist;
      });

    });

    describe("when user is null", () => {

      it('component is not visible', () => {
        component = renderComponent(componentObj, {user: null}, {});
        expect(component).to.not.exist;
      });

    });

    describe("when user is authorized", () => {

      it('component is visible', () => {
        component = renderComponent(componentObj, createProps(group), {});
        expect(component).to.exist;
      });

    });

    describe("when user is not authorized", () => {

      it("component is not visible", () => {
        component = renderComponent(componentObj, createProps("truc"), {});
        expect(component).to.not.exist;
      });

    });
  });

}

function createProps(group) {
  return {
    user: {
      groups: ["default", group]
    }
  };
}
