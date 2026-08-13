function ToDoItem({
    todo,
    onToggle,
    onEdit,
    onDelete
}) {

    return (

        <div
            className={`todo-card ${
                todo.completed
                    ? "completed"
                    : ""
            }`}
        >

          

            <button
                className="todo-check"
                onClick={() =>
                    onToggle(todo)
                }
            >

                {todo.completed
                    ? "✓"
                    : ""}

            </button>


           

            <div className="todo-info">

                <h3>
                    {todo.title}
                </h3>

                <p>
                    {todo.description ||
                        "No description"}
                </p>

            </div>


         

            <span
                className={`status ${
                    todo.completed
                        ? "status-completed"
                        : "status-pending"
                }`}
            >

                {todo.completed
                    ? "Completed"
                    : "Pending"}

            </span>


          

            <div className="todo-actions">

                <button
                    className="edit-button"
                    onClick={() =>
                        onEdit(todo)
                    }
                    title="Edit task"
                >
                    ✎
                </button>


                <button
                    className="delete-button"
                    onClick={() =>
                        onDelete(todo._id)
                    }
                    title="Delete task"
                >
                    🗑
                </button>

            </div>

        </div>
    );
}

export default ToDoItem;
