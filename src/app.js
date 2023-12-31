import express from 'express';
import routes from './routes/index.js';

const app = express();
app.use(express.json());
routes(app);

export default app;


/*
import 'dotenv/config';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';


console.log('rodando');

const serviceAccountAuth = new JWT({
	// env var values here are copied from service account credentials generated by google
	// see "Authentication" section in docs for more info
	email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
	key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
	scopes: [
		'https://www.googleapis.com/auth/spreadsheets.readonly',
	],
});

const getDoc = async () => {
	const doc = new GoogleSpreadsheet(process.env.SHEET_ID, serviceAccountAuth);

	await doc.loadInfo();
	return doc;
};
getDoc().then(doc => {
	console.log(doc.title);
});
*/