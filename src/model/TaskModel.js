/* Pasta para definir quais e como serão armazenadas as informações no banco de dados */

const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const SubTaskSchema = new Schema({

   /*Dentro do Schema são definidas as variaveis, seus determinados tipos e também se pode
   determinar se elas são requiridas ou não */

   type:             {type: String},
   subTitle:         {type: String},
   subDescription:   {type: String},
   startWhen:        {type: Date},
   finalWhen:        {type: Date},
   subDone:          {type: Boolean,   default: false},
   created:          {type: Date,      default: Date.now()},
   macaddress:       {type: String},

});

const TaskSchema = new Schema({
   
   /* Dentro do Schema são definidas as variaveis, seus determinados tipos e também se pode
   determinar se elas são requiridas ou não */

    macaddress:   {type: String},
    type:         {type: String},
    title:        {type: String},
    description:  {type: String},
    done:         {type: Boolean,  default: false},
    created:      {type: Date,    default: Date.now()},
    subtask:      [SubTaskSchema]
                     
});

/*Função que compila o modelo criado acima, os modelos são responsaveis por criar e ler os documentos
do banco de dados, onde é passado o nome do moledo e seu Schema */

module.exports = mongoose.model('Task', TaskSchema);

