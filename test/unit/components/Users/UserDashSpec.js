import { renderComponent, expect } from '../../testHelper';
import StudentDash from '../../../../src/js/components/Users/StudentDash';

let tested = {
  student: {
    componentObj: StudentDash,
    componentName: "StudentDash",
    group: "students",
  }
}

describeTest(tested.student);

function describeTest(tested) {

  let {componentName, componentObj, group} = tested;

  let component;

  describe(componentName, () => {

    describe("when user is authorized", () => {

      beforeEach(() => {
        component = renderComponent(componentObj, {}, createState(group));
      });

      it('component is visible', () => {
        expect(component).to.exist;
      });
    });

    describe("when user is not authorized", () => {

      beforeEach(() => {
        component = renderComponent(componentObj, {}, createState("truc"));
      });

      it("component is not visible", () => {
        expect(component).to.not.exist;
      });

    });
  });

}

function createState(group) {
  return {
    auth: {
      user: {
        groups: ["default", group]
      }
    }
  };
}
