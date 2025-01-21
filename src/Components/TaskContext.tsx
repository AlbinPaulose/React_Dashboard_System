import React, { createContext, useReducer, ReactNode, useContext } from 'react';

// Task Interface
interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: 'Pending' | 'Completed';
}

// State and Action Types
interface TaskState {
  tasks: Task[];
}

type TaskAction = { type: 'ADD_TASK'; payload: Task };

// Context Types
interface TaskContextProps {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

const initialState: TaskState = {
  tasks: [],
};

// Reducer Function
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    default:
      return state;
  }
};

// Provider Component
export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
};

// Export TaskContext directly
export { TaskContext };
