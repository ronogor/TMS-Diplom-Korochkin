import { Errors, SuccessMessages } from "./constants";

export default class RegistrationForm {
    private adminPass = "Newpassw0rd@dmin";

    constructor(
        private email: string,
        private password: string,
        private username: string,
        private age: number,
        private termsAgreement: boolean = false,
        private registered: boolean = false,
    ) {}

    public setEmail(email: string): void {
        const regex: RegExp = /[a-z][a-z0-9\.\-\_\%\+]+@[a-z0-9\.\-]+\.[a-z]{2,4}/gi;
        let match = email.match(regex);
        if (match && match[0] === email) {
            this.email = email;
        } else {
            throw new Error(Errors.INVALIDEMAIL);
        }
    }

    public setPassword(password: string): void {
        const regex: RegExp = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;
        let match = password.match(regex);
        if (match && match[0] === password) {
            this.password = password;
        } else {
            throw new Error(Errors.INVALIDPASSWORD);
        }
    }

    public setUsername(username: string): void {
        if (username) {
            this.username = username;
        } else {
            throw new Error(Errors.INVALIDUSERNAME);
        }
    }

    public setAge(age: number): void {
        if (age > 0 && age < 150) {
            this.age = age;
        } else {
            throw new Error(Errors.INVALIDAGE);
        }
    }

    public agreeWithTerms(): void {
        this.termsAgreement = true;
    }

    public register(): string {
        let errorMessage: string = "";

        const adaArray: [Function, string | number][] = [
            [this.setEmail, this.email],
            [this.setPassword, this.password],
            [this.setUsername, this.username],
            [this.setAge, this.age],
        ];
        adaArray.forEach((value) => {
            let fun = value[0];
            let param = value[1];
            try {
                fun.call(this, param);
            } catch (error: any) {
                errorMessage += error.message;
            }
        });
        if (!this.termsAgreement) {
            errorMessage += Errors.INVALIDTERMSAGREEMENT;
        }
        if (errorMessage) {
            return Errors.INVALIDREGISTRATION + errorMessage;
        } else {
            this.registered = true;
            return SuccessMessages.SUCCESSREGISTRATION;
        }
    }

    public fillFieldForRegister(
        email: string,
        password: string,
        username: string,
        age: number,
        agreementWithTerms: boolean,
    ) {
        let arraForFill: [Function, string | number][] = [
            [this.setEmail, email],
            [this.setPassword, password],
            [this.setUsername, username],
            [this.setAge, age],
        ];
        arraForFill.forEach((value) => {
            let fun = value[0];
            let param = value[1];
            try {
                fun.call(this, param);
            } catch (error) {}
        });

        try {
            if (agreementWithTerms) {
                this.agreeWithTerms();
            }
        } catch (error) {
            error;
        }
    }

    public clean(): void {
        this.email = "";
        this.password = "";
        this.username = "";
        this.age = 0;
        this.termsAgreement = false;
        this.registered = false;
    }

    public checkPassword(adminPass: string): string {
        if (this.adminPass === adminPass) {
            return this.password;
        } else {
            throw new Error(Errors.WRONGADMINPASS);
        }
    }

    public get checkEmail(): string {
        return this.email;
    }
    public get checkUsername(): string {
        return this.username;
    }
    public get checkAge(): number {
        return this.age;
    }
    public get checkAgreeWithTerms(): boolean {
        return this.termsAgreement;
    }
    public get checkRegistrated(): boolean {
        return this.registered;
    }
}
// const reg = new RegistrationForm("", "", "", 0);
// reg.setEmail("ronogor228@gmail.com");
// reg.setPassword("qweRt123EW");
// reg.setUsername("w");
// reg.setAge(26);
// reg.agreeWithTerms();
// reg.clean();
// reg.fillFieldForRegister("", "qweRt123EW", "w", 26, true);
// console.log(reg.register());
// console.log(reg.checkRegistrated);

//Комменты не подтирал, я на этом файле дебагаю когда возникает проблема