export function randomEmail(): string {
    const dataForRegEx: string[] = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789").split("");
    let email: string = "";
    for(let i: number = 0; i < 10; i++) {
        email += dataForRegEx[Math.round(Math.random() * (62 - 1) + 1)]
    }
    return `${email}@gmail.com`
}

export function randomPassword(): string {
    const dataForRegEx: string[] = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789").split("");
    let password: string = "";
    for(let i: number = 0; i < 12; i++) {
        password += dataForRegEx[Math.round(Math.random() * (62 - 1) + 1)]
    }
    return password
}