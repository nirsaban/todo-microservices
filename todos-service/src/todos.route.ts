import express, { Router, Request, Response, NextFunction } from "express";

import { TodosController } from "./todos.controller";

/**
 * A class representing a router for the Todos API.
 */
class TodosRouter {
  private router: Router;
  private controller: TodosController;
  constructor() {
    this.controller = new TodosController();
    this.router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post("", this.controller.createTodo);
    this.router.put("/:id", this.controller.editTodo);
    this.router.delete("/:id", this.controller.deleteTodo);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const todosRouter = new TodosRouter().getRouter();
