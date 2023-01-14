const db = require('mongoose');

db.Promise = global.Promise;

//URL = mongodb://127.0.0.1:27017/first_bd

async function connect (url){
    db.set('strictQuery', false);  
    await db.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    },60000)
        .then(() => console.log('[db] Conectada con éxito'))
        .catch(e => console.error('[db]', e));
      
}

module.exports = connect;
