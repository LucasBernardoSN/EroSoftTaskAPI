/* Pasta onde é verificado algums pré-requisitos para realização de alguns metódos de controle */

const TaskModel = require('../model/TaskModel');

/* A constante TaskValidation reúne todos esses pré-requisitos  */

const TaskValidation = async (req, res) => {

    const{ macaddress, title, description } = req.body;

    if (!macaddress)
    return res.status(400).json({ error: 'O macaddress é obrigatório!'});
   
    else if (!title)
    return res.status(400).json({ error: 'O título é obrigatório!'});

    else if (!description)
    return res.status(400).json({ error: 'A descrição é obrigatório!'});

}

module.exports = TaskValidation;