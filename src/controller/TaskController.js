/* Pasta onde serão controladas as funções que a aplicação poderá realizar*/

const TaskModel = require('../model/TaskModel');

const { startOfDay,     endOfDay, 
        startOfWeek,    endOfWeek, 
        startOfMonth,   endOfMonth,
        startOfYear,    endOfYear } = require('date-fns');
const { response } = require('express');

const current = new Date();

/* Classe TaskController para criar objetos e utilizá-los mais facilmente posteriormente */

class TaskController{


/* Então são criados métodos assíncronos para cada função que a aplicação irá realizar dentro da
   do escopo da classe de controle */


    /* Função para criar uma nova tarefa */
    async creat(req, res){

        const task = new TaskModel(req.body);

            await task

                    .save()

                    .then(response =>{
                        return res.status(200).json(response);
                    })

                    .catch(error =>{
                        return res.status(500).json(error);
                    });
    }

    async subcreat(req, res){

        const SubTask = await TaskModel.findById({'_id': req.params.id})

            SubTask.subtask.push(req.body)

            SubTask

                    .save()

                    .then(response =>{ 
                        return res.status(200).json(response);
                    })

                    .catch(error =>{
                        return res.status(500).json(error);
                    });
    }

    /* Função para modificar uma tarefa */
    async update(req, res){

        await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true})
        
            .then(response => {

                return res.status(200).json(response);
            })

            .catch( error => {

                return res.status(400).json(error);
            });


    }

    async subupdate(req, res){


        await TaskModel.findOneAndUpdate
        (
            {'subtask._id': req.params.id}, 
            { "$set": {"subtask.$": req.body}}, 
            {new: true}
        )

            .then(response => {

                return res.status(200).json(response);
            })

            .catch( error => {

                return res.status(400).json(error);
            });
    }

    /* Função que deleta uma tarefa específica */
    async delete(req, res){

        await TaskModel.deleteOne({'_id': req.params.id})

            .then(response => {

                return res.status(200).json(response);
            })

            .catch(error => {

                return res.status(500).json(error);
            });
    }
    
    async subdelete(req, res){

        await TaskModel.findOneAndUpdate
        (
            {'subtask._id': req.params.id}, 
            {'$pull': {'subtask': {'_id':req.params.id}}}, 
            {new: true}
        )

            .then(response => {

                return res.status(200).json(response);
            })

            .catch( error => {

                return res.status(400).json(error);
            });
    }

    /* Função que declara uma tarefa como concluída */
    async done(req, res){
        
        await TaskModel.findByIdAndUpdate(

            {'_id': req.params.id},
            {'done': req.params.done},
            {new: true} )

            .then(response => {

                return res.status(200).json(response);
            })

            .catch(error => {

                return res.status(500).json(error);
            });
    }
    
    async subdone(req, res){

        await TaskModel.findOneAndUpdate
        (
            {'subtask._id': req.params.id}, 
            { "$set": {"subtask.$.subDone": req.params.subDone}}, 
            {new: true}
        )
            
            .then(response => {

                return res.status(200).json(response);
            })

            .catch(error => {

                return res.status(500).json(error);
            });
    }

    /* Função que mostra uma tarefa específica (quando ela for selecionada) */
    async show(req, res){

        await TaskModel.findById(req.params.id)

            .then(response =>{  

                if(response){
                    return res.status(200).json(response);
                }
                else{
                    return res.status(404).json({error: 'Tarefa não encontrada!'});
                }
            })

            .catch(error => {

                return res.status(500).json(error);
            });
    }

    async subshow(req, res){

        const MainTask = await TaskModel.findById({'_id': req.params.subID})
        
        MainTask.subtask.id(req.params.id)


            .save()
        
            .then(response =>{  

                if(response){
                    return res.status(200).json(response);
                }
                else{
                    return res.status(404).json({error: 'Tarefa não encontrada!'});
                }
            })

            .catch(error => {

                return res.status(500).json(error);
            });
    }


/* FUNÇÕES UTILIZADAS COMO FILTROS DE VISUALIZAÇÃO DAS TAREFAS */


    /* Função de filtro que mostra todas as tarefas */
    async all(req, res){
    
        await TaskModel.find({  'macaddress': {'$in': req.params.macaddress},
                                'type':{'$eq': req.params.type}})

                        .sort('startWhen')
                        
                        .then(response => {

                            return res.status(200).json(response);
                        })
                        .catch(error => {

                            return res.status(500).json(error);
                        });
    } 

    async subAll(req, res){

        await TaskModel.findById(req.params.id)
                        
                        .then(response => {

                            return res.status(200).json(response)
                        })
                        .catch(error => {

                            return res.status(500).json(error);
                        });
    }

    /* Função de filtro que mostra as tarefas atrasadas */
    async late(req, res){

        await TaskModel
        
        .find({
            'when': {'$lt': current},
            'macaddress': {'$in': req.params.macaddress},
            'type':{'$eq': req.params.type}

        })

        .sort('when')

        .then(response => {

             return res.status(200).json(response);
        })

        .catch(error => {

            return res.status(500).json(error);
        });
    }

    /* Função de filtro que mostra as tarefas que finalizam hoje  */
    async today(req, res){

        await TaskModel
        
        .find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfDay(current), '$lte': endOfDay(current)},
            'type':{'$eq': req.params.type}
        })

        .sort('when')
        
        .then(response => {

             return res.status(200).json(response);
        })

        .catch(error => {

            return res.status(500).json(error);
        });
    }

    /* Função de filtro que mostra as tarefas que finalizam essa semana */
    async week(req, res){

        await TaskModel
        
        .find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfWeek(current), '$lte': endOfWeek(current)},
            'type':{'$eq': req.params.type}
        })

        .sort('when')
        
        .then(response => {

            return res.status(200).json(response);
        })

        .catch(error => {

            return res.status(500).json(error);
        });
    }

    /* Função de filtro que mostra as tarefas que finalizam esse mês */
    async month(req, res){

        await TaskModel
        
        .find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfMonth(current), '$lte': endOfMonth(current)},
            'type':{'$eq': req.params.type}

        })

        .sort('when')
        
        .then(response => {

             return res.status(200).json(response);
        })

        .catch(error => {

            return res.status(500).json(error);
        });
    }

    /* Função de filtro que mostra as tarefas que finalizam essa ano */
    async year(req, res){

        await TaskModel
        
        .find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfYear(current), '$lte': endOfYear(current)},
            'type':{'$eq': req.params.type}
        })

        .sort('when')
        
        .then(response => {

             return res.status(200).json(response);
        })

        .catch(error => {

            return res.status(500).json(error);
        });
    }
}

module.exports = new TaskController();