import mongoose from 'mongoose';
import Task from '~/app/models/Task';
import { ValidationError, NotFoundError } from '~/app/errors';

class TaskCompleteController {
  async store(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new ValidationError('Field id is not a valid ObjectId');

    const task = await Task.findById(id);
    if (!task) throw new NotFoundError('Task not found');
    if (task.completed)
      throw new ValidationError('Task alredy has been completed');

    task.completed = true;
    await task.save();

    return res.json(task);
  }
}

export default new TaskCompleteController();
