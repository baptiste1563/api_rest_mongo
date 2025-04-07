import React, { useEffect, useState } from 'react';

export default function TaskForm({ onSubmit, editingTask, cancelEdit }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
    completeFor: '',
  });

  useEffect(() => {
    if (editingTask) {
      const { title, description, assignedTo, completeFor } = editingTask;
      setForm({
        title,
        description,
        assignedTo,
        completeFor: completeFor ? completeFor.split('T')[0] : '',
      });
    }
  }, [editingTask]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', description: '', assignedTo: '', completeFor: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingTask ? 'Modifier la tâche' : 'Créer une tâche'}</h2>
      <input name="title" placeholder="Titre" value={form.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="assignedTo" placeholder="Assignée à" value={form.assignedTo} onChange={handleChange} />
      <input name="completeFor" type="date" value={form.completeFor} onChange={handleChange} />
      <button type="submit">{editingTask ? 'Modifier' : 'Créer'}</button>
      {editingTask && <button type="button" onClick={cancelEdit} style={{ backgroundColor: 'dark-gray' }}>Annuler</button>}
    </form>
  );
}

