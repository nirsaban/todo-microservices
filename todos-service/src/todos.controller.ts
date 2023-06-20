import express, { Request, NextFunction, Response } from "express";
import { TodoService } from "./todos.service";
import { TodoDTO } from "./todos.dto";
import { validate } from "class-validator";
import { Validator } from "./shared/helpers/validator.helper";

/**
 * A controller class for handling CRUD operations on Todo objects.
 */
export class TodosController {
  private service: TodoService;
  constructor() {
    this.service = new TodoService();
  }
  public createTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { title, deadline } = req.body;

      const todoDTO = new TodoDTO(title, deadline);

      const createdTodo: TodoDTO = await this.service.createTodo(todoDTO);

      await Validator.validate(todoDTO);

      res.send(createdTodo);
    } catch (error) {
      next(error);
    }
  };

  public editTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const todoId = req.params.id;
      const { title, deadline } = req.body;

      const todoDTO = new TodoDTO(title, deadline);

      await Validator.validatePartial(todoDTO);

      const updatedTodo = await this.service.editTodo(todoId, todoDTO);

      res.json(updatedTodo);
    } catch (error) {
      next(error);
    }
  };

  public deleteTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const todoId: string = req.params.id;

      await this.service.deleteTodo(todoId);

      res.send({ message: "todo deleted" });
    } catch (error) {
      next(error);
    }
  };
}
