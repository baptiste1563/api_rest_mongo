import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import * as api from './api';
import './App.css';


function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all'); // Filtre par statut
  const [sortBy, setSortBy] = useState('default'); // Critère de tri

  const fetchTasks = async () => {
    const res = await api.getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (form) => {
    if (editingTask) {
      await api.updateTask(editingTask._id, form);
      setEditingTask(null);
    } else {
      await api.createTask({ ...form, completed: false });
    }
    fetchTasks();
  };

  const handleToggle = async (task) => {
    await api.updateTask(task._id, { completed: !task.completed });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await api.deleteTask(id);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'incomplete') return !task.completed;
      return true; // 'all'
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.completeFor) - new Date(b.completeFor);
      } else if (sortBy === 'createdAt') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0; // Par défaut, ne pas trier
    });

  return (
    <div className="container">
      <h1>Gestionnaire de tâches</h1>
      <div className='parameters'>
        <div>
          <label>Filtrer : </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Toutes</option>
            <option value="completed">Terminées</option>
            <option value="incomplete">En cours</option>
          </select>
        </div>
        <div>
          <label>Trier par : </label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Par défaut</option>
            <option value="dueDate">Date de rendu</option>
            <option value="createdAt">Date de création</option>
          </select>
        </div>
      </div>
      <TaskForm onSubmit={handleCreate} editingTask={editingTask} cancelEdit={() => setEditingTask(null)} />
      <TaskList tasks={filteredTasks} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default App;
