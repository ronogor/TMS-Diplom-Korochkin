export let randomNumber = (min: number, max: number): number => {
    let randomNumber: number = Math.round(Math.random() * (max - min) + min);
    return randomNumber;
};

export let randomNumberNegative = (): number => {
    let randomNumber: number = Math.round(Math.random() * (99999999 - 9999999) + 9999999);
    return randomNumber;
};
