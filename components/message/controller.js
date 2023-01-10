const store = require('./store')

//USER = QUIEN LA AÑADE, MESSAGE = QUE ES LO QUE AÑADE
function addMessage(user, message){
    return new Promise((resolve, reject) =>{
        if(!user || !message){
            console.error('[messageController] No hay usuario o mensaje');
            reject('Los datos son incorrectos');
            return false;
        }
        const fullMessage = {
            user: user,
            message: message,
            date: new Date(),
        };
    
        store.add(fullMessage);
        resolve(fullMessage);

    })
    

};

function getMessages(){
    return new Promise((resolve, reject) => {
        resolve(store.list());
    })
}



//Exporto modulo ( se usa en network)
module.exports = {
    addMessage,
    getMessages
};