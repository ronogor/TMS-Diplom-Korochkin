
export default function randomNumber(): number {
    return Math.round(Math.random() * ( 1000 - 10 ) + 10);
}