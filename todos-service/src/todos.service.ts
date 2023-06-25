import { TodoDTO } from "./todos.dto";
import { Channel, connect } from "amqplib";
import Todo, { ITodo } from "./todos.model";
import { RabbitMQHelper } from "./shared/helpers/RabbitMQ.helper";
import { GeneralError } from "./shared/errors/general.error";

/**
 * A service class for managing Todo objects in a database.
 */
export class TodoService {
  public async createTodo(todoDTO: TodoDTO): Promise<ITodo> {
    try {
      const todo = new Todo({
        title: todoDTO.title,
        deadline: todoDTO.deadline,
        status: todoDTO.status,
      });

      const createdTodo = await todo.save();

      const rabbitMQService = new RabbitMQHelper("todos");

      await rabbitMQService.connect();

      const message = JSON.stringify(createdTodo);

      const now = new Date();
      const deadline = new Date(todo.deadline);
      const delay: number = this.calculateDelay(deadline, now);

      await rabbitMQService.sendMessage(message, { delay });

      return createdTodo;
    } catch (error) {
      throw new GeneralError(error.message);
    }
  }

  private calculateDelay(deadline: Date, now: Date): number {
    return deadline.getTime() - now.getTime();
  }

  public async editTodo(
    todoId: string,
    todoDTO: TodoDTO
  ): Promise<ITodo | null> {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        todoId,
        { ...todoDTO },
        { new: true }
      );

      return updatedTodo;
    } catch (error) {
      throw new GeneralError(error.message);
    }
  }

  public async deleteTodo(todoId: string): Promise<void> {
    try {
      await Todo.findByIdAndRemove(todoId);
    } catch (error) {
      throw new GeneralError(error.message);
    }
  }
}
