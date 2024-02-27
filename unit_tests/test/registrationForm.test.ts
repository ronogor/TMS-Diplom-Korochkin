import RegistrationForm from "../registrationForm";

let reg: RegistrationForm;

describe("Test registration form", () => {
    beforeAll(() => {
        reg = new RegistrationForm("", "", "", 0);
    });
    beforeEach(() => {
        reg.clean();
    })
});
