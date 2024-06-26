const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
const ejs = require('ejs');

/* app server */
const app = express();
const server = http.createServer(app);

/* dontenv */
require('dotenv').config();

/* view engine */
app.set('views', path.resolve('./applications'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

/* middlewares */
app.use(cors({
	origin: process.env.ALLOWED_ORIGINS,
	methods: process.env.ALLOWED_METHODS,
	allowedHeaders: process.env.ALLOWED_HEADERS
}));
app.use((req, res, next) => {
	res.setHeader('X-Coded-By', process.env.X_CODED_BY);
	res.removeHeader('X-Powered-By');
	next();
});
app.use(express.static(path.resolve('./public')));
app.use(express.static(path.resolve('./applications/production/auth-app')));
app.use(express.static(path.resolve('./applications/production/expense-tracker-app')));

/* routes */
// app.get('/auth/*', (req, res) => res.render('production/auth-app/index'));

/* server listening */
server.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT} ...`);
});
