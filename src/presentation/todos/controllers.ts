import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosControllers {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  };

  public getTodosById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todoId = await prisma.todo.findFirst({
      where: { id },
    });

    if (!todoId) {
      return res.status(404).json({ error: "ID not found" });
    }

    return res.json(todoId);
  };

  public createTodos = async (req: Request, res: Response) => {
    const [error, createTodoDto] =  CreateTodoDto.create(req.body);

    if(error) return res.status(400).json({error});

    const todo = await prisma.todo.create({
      data: createTodoDto!
    })

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [ error, updateTodoDto] =  UpdateTodoDto.update({...req.body, id});

    if(error) return res.status(400).json({error})
    

    const todoId = await prisma.todo.findFirst({
      where: { id },
    });

    if (!todoId) {
      return res.status(404).json({ error: `ID ${todoId} not found` });
    }


    const todoUpdate = await prisma.todo.update({
      where: todoId,
      data: updateTodoDto!.values
    });

    return res.json(todoUpdate);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const todoId = await prisma.todo.findFirst({
      where: { id },
    });

    if (!todoId) {
      return res.status(404).json({ error: `Todo with id ${id} not found` });
    }

    const todoDeleted = await prisma.todo.delete({
      where: { id },
    });

    todoDeleted ? res.json(todoDeleted) : res.status(400).json({error: "Error"});
  };
}
