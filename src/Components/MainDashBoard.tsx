import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import AddTask from './AddTask';
import Task from './Task';
import '../MainPage.css'

const MainDashBoard:React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Film PostProduction', status: 'Pending', priority: 'High' },
    { id: 2, title: 'Film Script', status: 'Completed', priority: 'Medium' },
    { id: 3, title: 'Script Review', status: 'Pending', priority: 'Low' },
    { id: 4, title: 'IFilm PreProduction', status: 'Completed', priority: 'High' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    let filtered = tasks;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, statusFilter]);

  // Update Task Status
  const markAsCompleted = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: 'Completed' } : task
      )
    );
  };

  return (
    <>
    <div className="dashboard-container">
  <h1>Task Dashboard</h1>
  <div>
                <BrowserRouter>
          <nav>
              <Link to="/add">Add Task</Link>
          </nav>
          <Routes>
            <Route path="/add" element={<AddTask />} />
            </Routes>
      </BrowserRouter>
                </div>
  <div className="search-bar-container">
    <input
      type="text"
      placeholder="Search by task title"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="All">All</option>
      <option value="Pending">Pending</option>
      <option value="Completed">Completed</option>
    </select>
  </div>
  <table>
    <thead>
      <tr>
        <th>Task ID</th>
        <th>Task Title</th>
        <th>Status</th>
        <th>Priority</th>
      </tr>
    </thead>
    <tbody>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.status}</td>
            <td>{task.priority}</td>
            <td>
                  {task.status === 'Pending' && (
                    <button
                      onClick={() => markAsCompleted(task.id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Mark as Completed
                    </button>
                  )}
                </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="no-tasks">
            No tasks found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

</>
  );
};

export default MainDashBoard;
