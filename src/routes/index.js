import express from 'express';
import torques from './torqueRoutes.js';

const routes = (app) => {
	/*app.route('/').get((_, res) => {
		res.status(200).send({ titulo: 'API Torque List' });
	});*/

	app.use(
		express.json(),
		torques
	);
};

export default routes;
