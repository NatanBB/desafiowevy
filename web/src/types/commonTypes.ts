
export type ProtectedProps = {
  children: JSX.Element
}

export type TodoItem = {
  task_id?: string;
  title: string;
  description: string;
  createdAt?: Date;
  user_id: string;
  completedOn?: Date;
}

export type ListTodoProps = {
  isCompleteScreen: boolean;
  listTodo: TodoItem[];
  editTask: TodoItem;
  listCompleted: TodoItem[];
  handleEditTask: (task_id: string, todo: TodoItem) => void;
  handleDeleteTask: (task_id: string, deleteCompleted: boolean) => void;
  handleComplete: (task: TodoItem) => void;
  setEditTask: React.Dispatch<React.SetStateAction<TodoItem>>;
  setListTodo: React.Dispatch<TodoItem[]>;
  setlistCompletedTodo: React.Dispatch<TodoItem[]>;
};

export type HeaderProps = {
  searchCallback: (search: string) => void;
}

export type User = {
  user_id: string;
  name: string;
  username: string;
  password: string;
  avatarUrl?: string;
}

export type FooterProps = {
  onLogout: () => void;
}