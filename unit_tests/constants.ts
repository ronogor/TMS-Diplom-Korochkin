import moment from "moment"

export enum Errors {
    INVALIDEMAIL = "You entered an invalid email address\n",
    INVALIDPASSWORD = "You entered an invalid password\n",
    INVALIDUSERNAME = "Username must contain at least 1 of any symbol\n",
    INVALIDAGE = "The age cannot be more than 150 or less than 0\n",
    INVALIDTERMSAGREEMENT = "You have not agreed to the terms of use\n",
    INVALIDREGISTRATION = "Registrtion not success. The fields are filled in incorrectly:\n",
    WRONGADMINPASS = "You entered the wrong admin password"
}

export class SuccessMessages {
    static SUCCESSREGISTRATION: string = `You have successfully registered, on the: ${moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)}`;
}

