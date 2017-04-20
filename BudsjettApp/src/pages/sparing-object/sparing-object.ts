

export class SparingObject {

	public id;
	public name;
	public prisTotal;
	public dato;

	constructor(id: number, name: string, prisTotal: number, dato: string) {
		
		console.log("SparingObject constructor ran!");

		this.id = id;
		this.name = name;
		this.prisTotal = prisTotal;
		this.dato = dato;
	
	}

	static fromJsonList(array): SparingObject[] {
		return array.map(SparingObject.fromJson);
	}

	static fromJson({id, name, prisTotal, dato}): SparingObject {
		return new SparingObject(id, name, prisTotal, dato);
	}
	
	
	
}
