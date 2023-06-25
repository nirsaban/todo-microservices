import mongoose, { Schema, Document } from "mongoose";
import { TodoStatusEnum } from "./todos.dto";

/**
 * Defines the schema for a Todo document and exports a mongoose model for it.
 * @interface ITodo - The interface for a Todo document.
 * @property {string} title - The title of the Todo.
 * @property {Date} deadline - The deadline for the Todo.
 * @constant {Schema} TodoSchema - The mongoose schema for a Todo document.
 * @default
 * {
 *   title: { type: String, required: true },
 *   deadline: { type: Date, required: true },
 * }
 * @returns A mongoose model for a Todo document.
 */
export interface ITodo extends Document {
  title: string;
  deadline: Date;
  status: TodoStatusEnum;
  reported: boolean;
}

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: {
    type: String,
    required: true,
  },
  reported: { type: Boolean, required: false },
});

export default mongoose.model<ITodo>("Todo", TodoSchema);
