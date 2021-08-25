export class Product {
	constructor(public name: string,
				public price: number,
				public quantity: number,
				public description: string,
				public imageUrl: string,
				public id?: number) {}
}
