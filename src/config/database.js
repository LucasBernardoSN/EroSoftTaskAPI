/* Pasta para incluir o Mongoose e conectá-lo com o MongoDB  */

const mongoose = require('mongoose');

/* Constante que recebe como declaração a URL do banco de dados onde estão armazenadas as tarefas */
const url = 'mongodb://localhost:27017/todo'; 

//url banco de dados na nuvem: 'mongodb+srv://EroSoftTask:EroSoftTask@erosofttask.rbho5.mongodb.net/EroSoftTask?retryWrites=true&w=majority'

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

module.exports = mongoose;