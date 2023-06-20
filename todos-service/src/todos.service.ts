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
      });

      const createdTodo = await todo.save();

      const rabbitMQService = new RabbitMQHelper("todos");

      await rabbitMQService.connect();

      const message = JSON.stringify(createdTodo);

      await rabbitMQService.sendMessage(message);

      return createdTodo;
    } catch (error) {
      throw new GeneralError(error.message);
    }
  }

  public async editTodo(
    todoId: string,
    todoDTO: TodoDTO
  ): Promise<ITodo | null> {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        todoId,
        {
          title: todoDTO.title,
          deadline: todoDTO.deadline,
        },
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
