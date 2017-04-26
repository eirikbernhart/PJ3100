

export class SparingObject {

	public id;
	public name;
	public prisTotal: number;
	public spartPris: number;
	public dato;
	public keyPointer;

	constructor(id: number, name: string, prisTotal: number, spartPris: number, dato: string, keyPointer: string) {
		
		console.log("SparingObject constructor ran!");

		this.id = id;
		this.name = name;
		this.prisTotal = prisTotal;
		this.spartPris = spartPris;
		this.dato = dato;
		this.keyPointer = keyPointer;
	
	}

	static fromJsonList(array): SparingObject[] {
		return array.map(SparingObject.fromJson);
	}

	static fromJson({id, name, prisTotal, spartPris, dato}): SparingObject {
		return new SparingObject(id, name, prisTotal, spartPris, dato, "");
	}
	
	
	
}
