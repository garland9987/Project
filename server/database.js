const faker = require('faker');
const database = {
	users: [],
	products: []
};
const productThreshold = 300;

for(let i = 1; i <= productThreshold; i++) {
	database.products.push({
		id: i,
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		price: Number(faker.commerce.price()),
		imageUrl: faker.random.image(),
		quantity: faker.datatype.number()
 	});
}

console.log(JSON.stringify(database));
