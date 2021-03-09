import { Router } from 'express';
import TaskController from '~/app/controllers/TaskController';

const routes = new Router();

routes.get('/tasks', TaskController.index);
routes.post('/tasks', TaskController.store);
routes.put('/tasks/:id', TaskController.update);
routes.delete('/tasks/:id/complete', TaskController.destroy);

export default routes;
