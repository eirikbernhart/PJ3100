

export class SparingObject {

	public id;
	public name;
	public pris;
	public dato;

	constructor(id: number, name: string, pris: number, dato: string) {
		
		console.log("SparingObject constructor ran!");

		this.id = id;
		this.name = name;
		this.pris = pris;
		this.dato = dato;
	
	}

	static fromJsonList(array): SparingObject[] {
		return array.map(SparingObject.fromJson);
	}

	static fromJson({id, name, pris, dato}): SparingObject {
		return new SparingObject(id, name, pris, dato);
	}
	
	
	
}
