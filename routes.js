const express = require('express');
const routes = express.Router();

const MainController = require('./controllers/MainController');
const AdminController = require('./controllers/AdminController');
const VacancyController = require('./controllers/VacancyController');

routes.get('/', MainController.index);
routes.get('/admin', AdminController.index);

routes.get('/admin/vagas', AdminController.indexVacancies);
routes.post('/admin/vagas', AdminController.storeVacancies);
routes.post('/admin/vagas/:id', AdminController.updateVacancies);

routes.get('/admin/vagas/nova', AdminController.createVacancies);
routes.get('/admin/vagas/:id', AdminController.editVacancies);
routes.get('/admin/vagas/excluir/:id', AdminController.destroyVacancies);
routes.get('/vaga/:id', VacancyController.show);

module.exports = routes;