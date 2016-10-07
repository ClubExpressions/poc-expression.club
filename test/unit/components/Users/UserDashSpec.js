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

    describe("when user is authorized", () => {

      beforeEach(() => {
        component = renderComponent(componentObj, createProps(group), {});
      });

      it('component is visible', () => {
        expect(component).to.exist;
      });
    });

    describe("when user is not authorized", () => {

      beforeEach(() => {
        component = renderComponent(componentObj, createProps("truc"), {});
      });

      it("component is not visible", () => {
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
