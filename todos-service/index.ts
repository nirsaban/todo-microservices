import express from "express";
import { connectToDatabase } from "./src/shared/config/database";
import { todosRouter } from "./src/todos.route";
import { handleErrors } from "./src/shared/middlewares/errorHandler.middleware";

/**
 * Represents an instance of an Express application.
 * @class
 */
class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.connectToDatabase();
    this.setupRoutes();
  }

  private setupMiddlewares(): void {
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    this.app.use("/todos", todosRouter, handleErrors);
  }

  private connectToDatabase(): void {
    connectToDatabase();
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

const app = new App();

app.start(3000);
