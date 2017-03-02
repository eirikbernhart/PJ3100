

export class NyForingObject {

public name: string;
public price: number;
public date;
public time;
public week;
public month;


    constructor(name, price, date, dateWeek, dateMonth, time) {
        console.log("nyForingObject constructor ran!");

        this.name = name;
        this.price = price;
        this.date = date;
        this.week = dateWeek;
        this.month = dateMonth;
        this.time = time;
        
    }

}