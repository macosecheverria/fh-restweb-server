import { Router } from "express";
import { TodosControllers } from "./controllers";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.imp";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";

export class TodoRoutes {
    static get routes(): Router{

        const router = Router();

        const datasource = new TodoDatasourceImpl();
        const todoRepository = new TodoRepositoryImpl(datasource);
        const todoController =  new TodosControllers(todoRepository);

        router.get("/", todoController.getTodos);
        router.get("/:id", todoController.getTodosById);
        router.post("/", todoController.createTodos);
        router.put("/:id", todoController.updateTodo);
        router.delete("/:id", todoController.deleteTodo);

        return router;
    }
}