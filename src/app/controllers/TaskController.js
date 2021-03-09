import mongoose from 'mongoose';
import Task from '~/app/models/Task';
import { ValidationError, NotFoundError } from '~/app/errors';

class TaskController {
  async index(req, res) {
    const tasks = await Task.find();
    return res.json(tasks);
  }

  async store(req, res) {
    const { description } = req.body;

    if (!description?.trim()) {
      throw new ValidationError('Field description is required');
    }

    const task = await Task.create({ description });
    return res.json(task);
  }

  async destroy(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new ValidationError('Field id is not a valid ObjectId');

    const task = await Task.findById(id);
    if (!task) throw new NotFoundError('Task not found');

    await task.delete();
    return res.json(task);
  }
}

export default new TaskController();
