export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
    return (
      <li>
        <span className={task.completed ? 'task-completed' : ''}>
          <strong>{task.title}</strong> - {task.description} <br />
          🧑 Assignée à {task.assignedTo} <br />
          📅 À faire pour le {new Date(task.completeFor).toLocaleDateString()} <br />
          ✅ Statut : {task.completed ? 'Terminée' : 'En cours'}
        </span>
        <br />
        <div className="item_button">
          <button onClick={() => onToggle(task)}>Terminée</button>
          <button onClick={() => onEdit(task)}>Modifier</button>
          <button onClick={() => onDelete(task._id)}>Supprimer</button>
        </div>
      </li>
    );
  }
  