import { Errors, SuccessMessages } from "./constants";

export default class RegistrationForm {
    constructor(
        private email: string,
        private password: string, 
        private username: string,
        private age: number,
        private termsAgreement: boolean = false, 
        private registered: boolean = false) {
    }

    public setEmail(email: string): void{
        const regex: RegExp = /[a-z][a-z0-9\.\-\_\%\+]+@[a-z0-9\.\-]+\.[a-z]{2,4}/gi
        let match = email.match(regex); 
        if (match && match[0] === email) {
            (this.email) = email;
        }
        else { 
            throw new Error(Errors.INVALIDEMAIL);
        }
    }
    
    public setPassword(password: string): void{
        const regex: RegExp = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;
        let match = password.match(regex);
        if (match && match[0] === password) {
            this.password = password;
        } else {
            throw new Error(Errors.INVALIDPASSWORD);
        }
    }

    public setUsername(username: string): void{
        if(username) {
            this.username = username;
        } else {
            throw new Error(Errors.INVALIDUSERNAME);
        }
    }

    public setAge(age: number): void{
        if (age > 0 && age < 150) {
            this.age = age;
        } else {
            throw new Error(Errors.INVALIDAGE);
        }
    }

    public agreeWithTerms(): void{
        this.termsAgreement = true;
    }

    public register(): string{
        let errorMessage: string = "";

        const adaArray: [Function, string | number][] = [
            [this.setEmail, this.email],
            [this.setPassword, this.password],
            [this.setUsername, this.username],
            [this.setAge, this.age],
        ]
        adaArray.forEach((value) => {
            let fun = value[0];
            let param = value[1];
            try {
                fun.call(this, param);
            } catch (error: any) {
                errorMessage += error.message + "\n";
            }
        });
        if(!this.termsAgreement){
            errorMessage += Errors.INVALIDTERMSAGREEMENT + "\n";
        }
        if(errorMessage){
            return errorMessage;
        } else {
            this.registered = true;
            return "You have successfully registered";
        }
    }
    public get checkemail(): string{
        return this.email;
    }
    public get checkPassword(): string{
        return this.password;
    }
    public get checkUsername(): string{
        return this.username;
    }
    public get checkAge(): number{
        return this.age;
    }
    public get checkAgreeWithTerms(): boolean{
        return this.termsAgreement;
    }
    public get checkRegistrated(): boolean{
        return this.registered;
    }
}
const reg = new RegistrationForm("", "", "", 0);
reg.setEmail("asas@dss.dsdsdsd.qw");
reg.setPassword("qweRt123EW");
reg.setUsername("ronogor");
reg.setAge(26);
reg.agreeWithTerms();
console.log(reg.register());
console.log(reg.checkRegistrated);