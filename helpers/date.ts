import moment from "moment";
export function currentDayAndMonth(): string {  
    return moment().locale("ru").format("D MMMM")
}