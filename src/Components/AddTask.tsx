import React, { useContext, useState } from 'react';
import { TaskContext } from './TaskContext';

const AddTask: React.FC = () => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    throw new Error('TaskContext must be used within a TaskProvider');
  }

  const { state, dispatch } = taskContext;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleAddTask = () => {
    if (!title.trim()) {
      alert('Title is required!');
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      status: 'Pending',
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });

    setTitle('');
    setDescription('');
    setPriority('Low');
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button onClick={handleAddTask}>Add Task</button>

      <h3>Tasks:</h3>
      <ul>
        {state.tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.priority} ({task.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddTask;
