import 'dotenv/config';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import NotFoundError from '../errors/NotFoundError.js';

class TorqueService {

	/** :GoogleSpreadsheet */
	#doc;

	findNames = async () => {
		const doc = await this.#getDoc();
		const names = Object.keys(doc.sheetsByTitle);
		return names;
	};

	findKeys = async (name) => {
		const rows = await this.#getSheetRows(name);
		return rows.map(row => row.get('key'));
	};

	findTorque = async (name, key) => {
		const rows = await this.#getSheetRows(name);
		const row = rows.find(row => (row.get('key') === key));

		if (row == undefined)
			throw new NotFoundError(`${key} não é uma chave válida para os torques de ${name}`);

		return {
			key: row.get('key'),
			torque: row.get('torque'),
			description: row.get('description')
		};
	};

	#getSheetRows = async (name) => {
		const sheet = await this.#getSheet(name);
		const rows = await sheet.getRows();

		if (rows === undefined)
			throw new NotFoundError(`Não há chaves para ${name}`);

		return rows;
	};

	#getSheet = async (name) => {
		const doc = await this.#getDoc();
		const sheet = doc.sheetsByTitle[name];

		if (sheet == undefined)
			throw new NotFoundError(`${name} não é um nome valido`);

		return sheet;
	};

	/**
     * 
     * @returns :GoogleSpreadsheet 
     */
	#getDoc /* :GoogleSpreadsheet */ = async () => {
		if (this.#doc == null) {
			const serviceAccountAuth = new JWT({
				// env var values here are copied from service account credentials generated by google
				// see "Authentication" section in docs for more info
				email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
				key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
				scopes: [
					'https://www.googleapis.com/auth/spreadsheets.readonly',
				],
			});

			this.#doc = new GoogleSpreadsheet(process.env.SHEET_ID, serviceAccountAuth);
			await this.#doc.loadInfo();
		}

		return this.#doc;
	};
}

export default TorqueService;