import mongoose from 'mongoose';
import Task from '~/app/models/Task';
import { ValidationError, NotFoundError } from '~/app/errors';

class TaskToogleController {
  async store(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new ValidationError('Field id is not a valid ObjectId');

    const task = await Task.findById(id);
    if (!task) throw new NotFoundError('Task not found');

    task.completed = !task.completed;
    await task.save();

    return res.json(task);
  }
}

export default new TaskToogleController();
