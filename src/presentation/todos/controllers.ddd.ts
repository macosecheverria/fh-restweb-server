import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosControllers {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    res.json(todos);
  };

  public getTodosById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      const todo = await this.todoRepository.findById(id);

      return res.json(todo);
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  public createTodos = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error });

    const createdTodo = await this.todoRepository.create(createTodoDto!);
    return res.json(createdTodo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);

    return res.json(updateTodoDto);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const deletedTodo = this.todoRepository.deleteById(id);

    return res.json(deletedTodo);
  };
}
