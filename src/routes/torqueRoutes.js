import express from 'express';
import TorqueController from '../controllers/torqueController.js';

const router = express.Router();

router
	.get('/', TorqueController.getNames)
	.get('/:name', TorqueController.getKeys)
	.get('/:name/:key', TorqueController.getTorque);


export default router;
