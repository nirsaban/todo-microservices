import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { ITodo } from "./todos.model";

/**
 * A data transfer object (DTO) for a todo item.
 * @class TodoDTO
 */

export enum TodoStatusEnum {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export class TodoDTO {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsDateString()
  public deadline: Date;

  @IsEnum(TodoStatusEnum, { each: true })
  status: TodoStatusEnum;

  reported: boolean;

  constructor(dto: TodoDTO) {
    this.title = dto.title;
    this.deadline = dto.deadline;
    this.status = dto.status || TodoStatusEnum.ACTIVE;
    this.reported = dto.reported || false;
  }
}
