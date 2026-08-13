import { useState } from "react";

function ToDoForm({ onTodoAdded }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            return;
        }

        try {

            setLoading(true);

            await onTodoAdded(
                title.trim(),
                description.trim()
            );

            setTitle("");
            setDescription("");

        } finally {

            setLoading(false);

        }
    };

    return (
        <form
            className="todo-form"
            onSubmit={handleSubmit}
        >

            <div className="input-group">

                <label>
                    Task title
                </label>

                <input
                    type="text"
                    placeholder="What do you need to do?"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

            </div>


            <div className="input-group">

                <label>
                    Description
                </label>

                <input
                    type="text"
                    placeholder="Add some details..."
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

            </div>


            <button
                type="submit"
                className="add-button"
                disabled={loading}
            >
                {loading
                    ? "Adding..."
                    : "+ Add Task"
                }
            </button>

        </form>
    );
}

export default ToDoForm;