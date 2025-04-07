import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit}/>
      ))}
    </ul>
  );
}
