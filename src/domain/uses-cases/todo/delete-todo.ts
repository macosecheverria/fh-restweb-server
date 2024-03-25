import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface TodoDeleteUseCases {
  execute(id: number): Promise<TodoEntity>;
}

export class DeleteTodo implements TodoDeleteUseCases {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: number): Promise<TodoEntity> {
    return this.repository.deleteById(id);
  }
}
