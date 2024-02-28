import {
    userForRegistration,
    correctEmail,
    unCorrectEmail,
    correctPassword,
    unCorrectPassword,
    correctUsername,
    unCorrectUsername,
    correctAge,
    unCorrectAge,
    dataForTestRegister,
    adminPassword,
    wrongAdminPassword,
} from "./testData";
import { Errors, SuccessMessages } from "../constants";

describe("Test class RegistrationForm", () => {
    beforeEach(() => {
        userForRegistration.clean();
    });

    correctEmail.forEach((email, description) => {
        test(`Positive test: input ${description}`, () => {
            userForRegistration.setEmail(email);
            expect(userForRegistration.checkEmail).toBe(email);
        });
    });
    unCorrectEmail.forEach((badEmail, description) => {
        test(`Negative test: input ${description}`, () => {
            expect(() => userForRegistration.setEmail(badEmail)).toThrow(Errors.INVALIDEMAIL);
        });
    });

    correctPassword.forEach((password, description) => {
        test(`Positive test: input ${description}`, () => {
            userForRegistration.setPassword(password);
            expect(userForRegistration.checkPassword(adminPassword)).toBe(password);
        });
    });

    unCorrectPassword.forEach((badPassword, description) => {
        test(`Negative test: input ${description}`, () => {
            expect(() => userForRegistration.setPassword(badPassword)).toThrow(Errors.INVALIDPASSWORD);
        });
    });

    test("Negative test: input wrong admin password for get user password", () => {
        expect(() => userForRegistration.checkPassword(wrongAdminPassword)).toThrow(Errors.WRONGADMINPASS);
    });

    test(`Positive test: input correct username`, () => {
        userForRegistration.setUsername(correctUsername);
        expect(userForRegistration.checkUsername).toBe(correctUsername);
    });

    test(`Negative test: input: uncorrect username`, () => {
        expect(() => userForRegistration.setUsername(unCorrectUsername)).toThrow(Errors.INVALIDUSERNAME);
    });

    correctAge.forEach((age, description) => {
        test(`Positive test: input ${description}`, () => {
            userForRegistration.setAge(age);
            expect(userForRegistration.checkAge).toBe(age);
        });
    });

    unCorrectAge.forEach((badage, description) => {
        test(`Negative test: input ${description}`, () => {
            expect(() => userForRegistration.setAge(badage)).toThrow(Errors.INVALIDAGE);
        });
    });

    test("Positive test: acceptance of the terms of the agreement", () => {
        userForRegistration.agreeWithTerms();
        expect(userForRegistration.checkAgreeWithTerms).toBeTruthy();
    });

    test("Negative test: disagreement with the terms of the agreement", () => {
        expect(userForRegistration.checkAgreeWithTerms).toBeFalsy();
    });

    test("Positive test: success registration", () => {
        userForRegistration.fillFieldForRegister(
            dataForTestRegister.EMAIL,
            dataForTestRegister.PASSWORD,
            dataForTestRegister.USERNAME,
            dataForTestRegister.AGE,
            dataForTestRegister.AGREEMENTWITHTERMS,
        );
        let registretedUser = userForRegistration.register();
        expect(registretedUser).toBe(SuccessMessages.SUCCESSREGISTRATION);
        expect(userForRegistration.checkRegistrated).toBeTruthy();
    });

    test("Negative test: unsuccess registration without input email", () => {
        userForRegistration.fillFieldForRegister(
            "",
            dataForTestRegister.PASSWORD,
            dataForTestRegister.USERNAME,
            dataForTestRegister.AGE,
            dataForTestRegister.AGREEMENTWITHTERMS,
        );
        let registretedUser = userForRegistration.register();
        expect(registretedUser).toBe(Errors.INVALIDREGISTRATION + Errors.INVALIDEMAIL);
        expect(userForRegistration.checkRegistrated).toBeFalsy();
    });

    test("Negative test: unsuccess registration without input password", () => {
        userForRegistration.fillFieldForRegister(
            dataForTestRegister.EMAIL,
            "",
            dataForTestRegister.USERNAME,
            dataForTestRegister.AGE,
            dataForTestRegister.AGREEMENTWITHTERMS,
        );
        let registretedUser = userForRegistration.register();
        expect(registretedUser).toBe(Errors.INVALIDREGISTRATION + Errors.INVALIDPASSWORD);
        expect(userForRegistration.checkRegistrated).toBeFalsy();
    });

    test("Negative test: unsuccess registration without input username", () => {
        userForRegistration.fillFieldForRegister(
            dataForTestRegister.EMAIL,
            dataForTestRegister.PASSWORD,
            "",
            dataForTestRegister.AGE,
            dataForTestRegister.AGREEMENTWITHTERMS,
        );
        let registretedUser = userForRegistration.register();
        expect(registretedUser).toBe(Errors.INVALIDREGISTRATION + Errors.INVALIDUSERNAME);
        expect(userForRegistration.checkRegistrated).toBeFalsy();
    });

    test("Negative test: unsuccess registration without input age", () => {
        userForRegistration.fillFieldForRegister(
            dataForTestRegister.EMAIL,
            dataForTestRegister.PASSWORD,
            dataForTestRegister.USERNAME,
            0,
            dataForTestRegister.AGREEMENTWITHTERMS,
        );
        let registretedUser = userForRegistration.register();
        expect(registretedUser).toBe(Errors.INVALIDREGISTRATION + Errors.INVALIDAGE);
        expect(userForRegistration.checkRegistrated).toBeFalsy();
    });

    test("Negative test: unsuccess registration - disagreement with the terms of the agreement", () => {
        userForRegistration.fillFieldForRegister(
            dataForTestRegister.EMAIL,
            dataForTestRegister.PASSWORD,
            dataForTestRegister.USERNAME,
            dataForTestRegister.AGE,
            false,
        );
        let registretedUser = userForRegistration.register();
        expect(registretedUser).toBe(Errors.INVALIDREGISTRATION + Errors.INVALIDTERMSAGREEMENT);
        expect(userForRegistration.checkRegistrated).toBeFalsy();
    });

    test("Negative test: unsuccess registration - all fields are not filled in", () => {
        let registretedUser = userForRegistration.register();
        expect(registretedUser).toBe(
            Errors.INVALIDREGISTRATION +
                Errors.INVALIDEMAIL +
                Errors.INVALIDPASSWORD +
                Errors.INVALIDUSERNAME +
                Errors.INVALIDAGE +
                Errors.INVALIDTERMSAGREEMENT,
        );
        expect(userForRegistration.checkRegistrated).toBeFalsy();
    });
});
