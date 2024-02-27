import RegistrationForm from "../registrationForm";

export let userForRegistration = new RegistrationForm("", "", "", 0);

export const correctEmail = new Map <string, string>([
    ["correct email", "ronogor228@gmail.com"],
    ["correct email with special symbol", "rono_-gh%.H@yandex.ru"],
    ["correct email with not one dot after @", "ronogor228@crs.devzone.com"]
]);

export const unCorrectEmail = new Map <string, string>([
    ["uncorrect email", "ronogor"],
    ["uncorrect email with firs level domain > 4 symbol", "rono_-gh%.H@yandex.rubumbumbum"],
    ["uncorrect email with number on first symbol of the email", "2ronogor228@gmail.com"]
]);

export const correctPassword = new Map <string, string>([
    ["correct password", "Qwe1rtyu"],
    ["correct password with > 8 symbols", "qweewereerrt1Q"],
    ["correct password with not one number", "qWeRT123tyu"]
]);

export const unCorrectPassword = new Map <string, string>([
    ["uncorrect password", "qwerty123"],
    ["uncorrect password with < 8 symbol", "qwerty"],
    ["uncorrect password with special symbol", "Qwe123$%"]
]);

export const correctUsername: string = "ronogor";
export const unCorrectUsername: string = "";

export const correctAge = new Map <string, number>([
    ["correct age - minimum boundary value", 1],
    ["correct age - middle boundary value", 75],
    ["correct age - maximum boundary value", 149]
]);

export const unCorrectAge = new Map <string, number>([
    ["uncorrect age - less than 1 minimum boundary value", 0],
    ["uncorrect age - more by 1 maximum boundary value", 150], 
    ["uncorrect age - NaN", NaN]
]);

export enum dataForTestRegister {
    EMAIL = "ronogor228@gmail.com",
    PASSWORD = "Qwe123qw",
    USERNAME = "ronogor",
    AGE = 26
}
