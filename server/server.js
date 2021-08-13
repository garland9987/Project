const _ = require('lodash');
const path = require('path');
const db = path.join(__dirname, 'database.json');
const jwt = require('jsonwebtoken');
const key = 'myappsecret';
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

const baseUrls = ['/products'];

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
	for(let baseUrl of baseUrls) {
		if(req.url.startsWith(baseUrl)) {
			let token = req.headers['authorization'];

			try {
				// decoded is the second part of jwt
				let decoded = jwt.verify(token, key);
				next();
				return;
			}
			catch(error) {
				res.status(401).end();
				return;
			}
		}
	}

	next();
});

// Add custom routes before JSON Server router
server.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	router.db.get('users').find({ username: username, password: password }).value() ?
		res.jsonp({ username: username, token: jwt.sign({ username: username }, key, { expiresIn: '1d' }) }) :
		res.status(404).jsonp({ username: '', token: null });
});

server.put('/password', (req, res) => {
	const username = req.body.username;
	const oldPassword = req.body.oldPassword;
	const newPassword = req.body.newPassword;

	const clonedUsers = _.cloneDeep(router.db.get('users').value());
	const index = _.findIndex(clonedUsers, { username: username, password: oldPassword });

	clonedUsers[index].password = newPassword;

	router.db.set('users', clonedUsers).write();

	res.status(200).end();
});

// To modify responses, overwrite 'router.render' method
router.render = (req, res) => {
	let len = Object.keys(res.locals.data).length;

	if(req.method === 'POST' && req.url === '/users') {
		len !== 0 ?
			res.jsonp({ username: res.locals.data.username, token: jwt.sign({ username: res.locals.data.username }, key, { expiresIn: '1d' }) }) :
			res.status(409).jsonp({ username: '', token: null });

		return;
	}

	setTimeout(() => {	// simulate server delay

		res.jsonp(res.locals.data);

	}, 1500);
}

server.use(jsonServer.rewriter({
	'/products?page=:page&limit=:limit': '/products?_page=:page&_limit=:limit'
}));

server.use(router);

server.listen(3500, () => {
	console.log('JSON Server is running');
});
