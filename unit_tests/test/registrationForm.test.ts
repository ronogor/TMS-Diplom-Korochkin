import { userForRegistration, correctEmail, unCorrectEmail, correctPassword, unCorrectPassword, correctUsername, unCorrectUsername, correctAge, unCorrectAge, dataForTestRegister } from "./testData";
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
            expect(userForRegistration.checkPassword).toBe(password);
        });
    });

    unCorrectPassword.forEach((badPassword, description) => {
        test(`Negative test: input ${description}`, () => {
            expect(() => userForRegistration.setPassword(badPassword)).toThrow(Errors.INVALIDPASSWORD);
        });
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
        userForRegistration.setEmail(dataForTestRegister.EMAIL);
        userForRegistration.setPassword(dataForTestRegister.PASSWORD);
        userForRegistration.setUsername(dataForTestRegister.USERNAME);
        userForRegistration.setAge(dataForTestRegister.AGE);
        userForRegistration.agreeWithTerms();
        let registretedUser = userForRegistration.register();
        expect(registretedUser).toBe(SuccessMessages.SUCCESSREGISTRATION);
        expect(userForRegistration.checkRegistrated).toBeTruthy();
    });

    test("Negative test: unsuccess registration without input email", () => {
        userForRegistration.setPassword(dataForTestRegister.PASSWORD);
        userForRegistration.setUsername(dataForTestRegister.USERNAME);
        userForRegistration.setAge(dataForTestRegister.AGE);
        userForRegistration.agreeWithTerms();
        let registretedUser = userForRegistration.register();
        expect(registretedUser).toMatch(Errors.INVALIDEMAIL);
        expect(registretedUser).toMatch(Errors.INVALIDREGISTRATION);
        expect(userForRegistration.checkRegistrated).toBeFalsy();
    });

    test("Negative test: unsuccess registration without input password", () => {
        userForRegistration.setEmail(dataForTestRegister.EMAIL);
        userForRegistration.setUsername(dataForTestRegister.USERNAME);
        userForRegistration.setAge(dataForTestRegister.AGE);
        userForRegistration.agreeWithTerms();
        let registretedUser = userForRegistration.register();
        expect(registretedUser).toMatch(Errors.INVALIDPASSWORD);
        expect(registretedUser).toMatch(Errors.INVALIDREGISTRATION);
        expect(userForRegistration.checkRegistrated).toBeFalsy();
    });

    test("Negative test: unsuccess registration without input username", () => {
        userForRegistration.setEmail(dataForTestRegister.EMAIL);
        userForRegistration.setPassword(dataForTestRegister.PASSWORD);
        userForRegistration.setAge(dataForTestRegister.AGE);
        userForRegistration.agreeWithTerms();
        let registretedUser = userForRegistration.register();
        expect(registretedUser).toMatch(Errors.INVALIDUSERNAME);
        expect(registretedUser).toMatch(Errors.INVALIDREGISTRATION);
        expect(userForRegistration.checkRegistrated).toBeFalsy();
    });

    test("Negative test: unsuccess registration without input age", () => {
        userForRegistration.setEmail(dataForTestRegister.EMAIL);
        userForRegistration.setPassword(dataForTestRegister.PASSWORD);
        userForRegistration.setUsername(dataForTestRegister.USERNAME);
        userForRegistration.agreeWithTerms();
        let registretedUser = userForRegistration.register();
        expect(registretedUser).toMatch(Errors.INVALIDAGE);
        expect(registretedUser).toMatch(Errors.INVALIDREGISTRATION);
        expect(userForRegistration.checkRegistrated).toBeFalsy();
    });
    
    test("Negative test: unsuccess registration - disagreement with the terms of the agreement", () => {
        userForRegistration.setEmail(dataForTestRegister.EMAIL);
        userForRegistration.setPassword(dataForTestRegister.PASSWORD);
        userForRegistration.setUsername(dataForTestRegister.USERNAME);
        userForRegistration.setAge(dataForTestRegister.AGE);
        let registretedUser = userForRegistration.register();
        expect(registretedUser).toMatch(Errors.INVALIDTERMSAGREEMENT);
        expect(userForRegistration.checkRegistrated).toBeFalsy();
    });

    test("Negative test: unsuccess registration - all fields are not filled in", () => {
        let registretedUser = userForRegistration.register();
        expect(registretedUser).toMatch(Errors.INVALIDEMAIL);
        expect(registretedUser).toMatch(Errors.INVALIDPASSWORD);
        expect(registretedUser).toMatch(Errors.INVALIDUSERNAME);
        expect(registretedUser).toMatch(Errors.INVALIDAGE);
        expect(registretedUser).toMatch(Errors.INVALIDTERMSAGREEMENT);
        expect(registretedUser).toMatch(Errors.INVALIDREGISTRATION);
        expect(userForRegistration.checkRegistrated).toBeFalsy();
    });
});
