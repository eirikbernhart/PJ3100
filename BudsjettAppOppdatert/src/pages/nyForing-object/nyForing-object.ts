

export class NyForingObject {

public name: string;
public price: number;
public date;
public time;


    constructor(name, price, date, time) {
        console.log("nyForingObject constructor ran!");

        this.name = name;
        this.price = price;
        this.date = date;
        this.time = time;
        
    }

}