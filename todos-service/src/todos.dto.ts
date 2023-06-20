import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";
import { ITodo } from "./todos.model";

/**
 * A data transfer object (DTO) for a todo item.
 * @class TodoDTO
 */
export class TodoDTO {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsDateString()
  public deadline: Date;

  constructor(title: string, deadline: Date) {
    this.title = title;
    this.deadline = deadline;
  }
}
