/* Pasta onde são definidas as rotas usadas pela aplicação */

const express = require('express');
const router = express.Router();
const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');

router.post     ('/',               TaskValidation,     TaskController.creat); 
router.put      ('/:id',            TaskValidation,     TaskController.update);
router.get      ('/:id',                                TaskController.show);
router.delete   ('/:id',                                TaskController.delete);
router.put      ('/done/:id/:done',                     TaskController.done);
router.post     ('/subtask/:id',                        TaskController.subcreat); 
router.put      ('/subtask/:id/:subID',                 TaskController.subupdate);
router.get      ('/subshow/:id/:subID',                 TaskController.subshow);
router.delete   ('/subtask/:id',                        TaskController.subdelete);
router.put      ('/subdone/:id/:subDone',               TaskController.subdone);


router.get('/filter/all/:macaddress/:type',             TaskController.all);
router.get('/filter/all/:macaddress/:type/:id',         TaskController.subAll);
router.get('/filter/late/:macaddress/:type',            TaskController.late);
router.get('/filter/today/:macaddress/:type',           TaskController.today);
router.get('/filter/week/:macaddress/:type',            TaskController.week);
router.get('/filter/month/:macaddress/:type',           TaskController.month);
router.get('/filter/year/:macaddress/:type',            TaskController.year);

module.exports = router;