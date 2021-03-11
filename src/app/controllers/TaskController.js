import mongoose from 'mongoose';
import Task from '~/app/models/Task';
import { ValidationError, NotFoundError } from '~/app/errors';

class TaskController {
  async index(req, res) {
    // Make the complete and search filter
    const { completed, search } = req.query;
    const filter = {};
    if (completed != null) filter.completed = completed;
    if (search != null && search.trim() !== '')
      filter.description = { $regex: `.*${search}.*`, $options: 'i' };

    // Set limit, get page and calculate the skip
    const limit = Math.min(Math.max(req.query.limit || 10, 5), 100);
    const page = Math.max(req.query.page || 1, 1);
    const skip = (page - 1) * limit;

    // Get the data
    const tasks = await Task.find(filter)
      .sort({ created_at: -1 })
      .limit(limit)
      .skip(skip);

    // Get the count and calculate the number of pages
    const count = await Task.countDocuments(filter);
    const pages = Math.ceil(count / limit);

    // Build the response
    return res.json({ pages, items: tasks });
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
