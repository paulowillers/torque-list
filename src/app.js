import 'dotenv'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import credenciais from './credenciais.json';

if (true) {
    console.log('rodando');
    return;
}

const getDoc = async () => {
    const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

    await doc.useServiceAccountAuth({
        client_email: credenciais.client_email,
        private_key: credenciais.private_key.replace(/\\n/g, '\n')
    })
    await doc.loadInfo();
    return doc;
}
getDoc().then(doc => {
    console.log(doc.title);
});

