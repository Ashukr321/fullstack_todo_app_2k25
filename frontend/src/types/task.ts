export interface Task {
  _id?: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date | string;
  user: string; // mongoose.Schema.Types.ObjectId
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTaskData {
  title: string;
  description: string;
  completed?: boolean;
  dueDate: string; // Always string for form inputs
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date | string;
} 