import { Router } from 'express';

import TaskController from '~/app/controllers/TaskController';
import TaskToogleController from '~/app/controllers/TaskToogleController';

const routes = new Router();

routes.get('/tasks', TaskController.index);
routes.post('/tasks', TaskController.store);
routes.delete('/tasks/:id', TaskController.destroy);
routes.post('/tasks/:id/toogle', TaskToogleController.store);

export default routes;
