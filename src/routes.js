import { Router } from 'express';
import TaskController from '~/app/controllers/TaskController';
import TaskCompleteController from '~/app/controllers/TaskCompleteController';

const routes = new Router();

routes.get('/tasks', TaskController.index);
routes.post('/tasks', TaskController.store);
routes.delete('/tasks/:id', TaskController.destroy);
routes.post('/tasks/:id/complete', TaskCompleteController.store);

export default routes;
