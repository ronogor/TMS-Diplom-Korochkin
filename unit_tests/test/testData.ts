import RegistrationForm from "../registrationForm";

export let userForRegistration = new RegistrationForm("", "", "", 0);

export const adminPassword = "Newpassw0rd@dmin";

export const wrongAdminPassword = "hackingAttempt";

export const correctEmail = new Map<string, string>([
    ["correct email", "ronogor228@gmail.com"],
    ["correct email with special symbol", "ronogh%H@yandex.ru"],
    ["correct email with not one dot after @", "ronogor228@crs.devzone.com"],
    ["correct email with capital letter at the beginning email", "Romogor@qj.ru"]
]);

export const unCorrectEmail = new Map<string, string>([
    ["uncorrect email", "ronogor"],
    ["uncorrect email with firs level domain > 4 symbol", "rono_-gh%.H@yandex.rubumbumbum"],
    ["uncorrect email with number on first symbol of the email", "2ronogor228@gmail.com"],
]);

export const correctPassword = new Map<string, string>([
    ["correct password", "Qwe1rtyu"],
    ["correct password with 14 symbols", "qwertyui12QWE4"],
    ["correct password with 30 symbols", "qwertyuiopASDFGHJKLZ1234567890"],
    ["correct password with not one number", "qWeRT123tyu"],
]);

export const unCorrectPassword = new Map<string, string>([
    ["uncorrect password", "qwerty123"],
    ["uncorrect password with < 8 symbol", "qwerty"],
    ["uncorrect password with special symbol", "Qwe123$%"],
]);

export const correctUsername = new Map<string, string>([
    ["correct username", "ronogor"],
    ["correct username with spicial symbols", "Nagib@torrr"],
    ["correct username with numbers", "valerka228"],
]);
export const unCorrectUsername: string = "";

export const correctAge = new Map<string, number>([
    ["correct age - minimum boundary value", 1],
    ["correct age - middle boundary value", 75],
    ["correct age - maximum boundary value", 149],
]);

export const unCorrectAge = new Map<string, number>([
    ["uncorrect age - less than 1 minimum boundary value", 0],
    ["uncorrect age - more by 1 maximum boundary value", 150],
    ["uncorrect age - NaN", NaN],
]);

export class dataForTestRegister {
    static EMAIL = "ronogor228@gmail.com";
    static PASSWORD = "Qwe123qw";
    static USERNAME = "ronogor";
    static AGE = 26;
    static AGREEMENTWITHTERMS = true;
}
