import { RabbitMQHelper } from "./RabbitMQ.helper";

export class TodoDTO {
  title: string;
  deadline: Date;
}

/**
 * A service class that handles sending notifications for expired todos.
 */
export class NotificationService {
  private rabbitMQService: RabbitMQHelper;

  constructor() {
    this.rabbitMQService = new RabbitMQHelper("todos");
    this.rabbitMQService.connect().then(() => {
      this.rabbitMQService.consumeTodoMessages<TodoDTO>(this.handleTodoMessage);
    });
  }

  private handleTodoMessage = (todo: TodoDTO): void => {
    if (this.isTodoExpired(todo)) {
      this.sendNotification(todo);
    }
  };

  private isTodoExpired(todo: TodoDTO): boolean {
    const deadline = new Date(todo.deadline);
    const currentDate = new Date();
    return deadline < currentDate;
  }

  private sendNotification(todo: TodoDTO): void {
    console.log("Sending notification for expired todo:", todo);
  }
}
