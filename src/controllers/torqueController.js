import NotFoundError from '../errors/NotFoundError.js';
import TorqueService from '../services/torqueService.js';

const service = new TorqueService();

class TorqueController {

	static getNames = async (_, res) => {
		try {
			const resultado = await service.findNames();
			return res.status(200).json(resultado);
		} catch (err) {
			const status = (err instanceof NotFoundError) ? 404 : 500;
			return res.status(status).json({ message: err.message });
		}
	};

	static getKeys = async (req, res) => {
		try {
			const { name } = req.params;
			const resultado = await service.findKeys(name);
			return res.status(200).json(resultado);
		} catch (err) {
			const status = (err instanceof NotFoundError) ? 404 : 500;
			return res.status(status).json({ message: err.message });
		}
	};

	static getTorque = async (req, res) => {
		try {
			const { name, key } = req.params;
			const resultado = await service.findTorque(name, key);
			return res.status(200).json(resultado);
		} catch (err) {
			const status = (err instanceof NotFoundError) ? 404 : 500;
			return res.status(status).json({ message: err.message });
		}
	};
}

export default TorqueController;