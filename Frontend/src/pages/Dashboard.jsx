import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Stats from "../components/Stats";
import ToDoForm from "../components/ToDoForm";
import ToDoItem from "../components/ToDoItem";

import "./Dashboard.css";


function Dashboard() {

    const [todos, setTodos] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    

    const [searchTerm, setSearchTerm] = useState("");


   

    const [filter, setFilter] = useState("all");


    

    const [editingTodo, setEditingTodo] =
        useState(null);

    const [editTitle, setEditTitle] =
        useState("");

    const [editDescription, setEditDescription] =
        useState("");


   

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );


   

    useEffect(() => {

        fetchTodos();

    }, []);


    const fetchTodos = async () => {

        try {

            setLoading(true);

            setError("");


            const token =
                localStorage.getItem("token");


            const response =
                await api.get(
                    "/todos",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );


            console.log(
                "GET TODOS RESPONSE:",
                response.data
            );


            setTodos(
                response.data.todos || []
            );


        } catch (error) {

            console.error(
                "GET TODOS ERROR:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to load todos"
            );


        } finally {

            setLoading(false);

        }
    };


    

    const handleTodoAdded = async (
        title,
        description
    ) => {

        try {

            setError("");


            const token =
                localStorage.getItem("token");


            const response =
                await api.post(

                    "/todos",

                    {
                        title,
                        description,
                    },

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );


            console.log(
                "ADD TODO RESPONSE:",
                response.data
            );


            setTodos(
                (previousTodos) => [

                    response.data.todo,

                    ...previousTodos

                ]
            );


        } catch (error) {

            console.error(
                "ADD TODO ERROR:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to create todo"
            );


            throw error;

        }
    };


  

    const handleToggleTodo = async (
        todo
    ) => {

        try {

            setError("");


            const token =
                localStorage.getItem("token");


            const response =
                await api.put(

                    `/todos/${todo._id}`,

                    {
                        title:
                            todo.title,

                        description:
                            todo.description,

                        completed:
                            !todo.completed,
                    },

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );


            console.log(
                "TODO UPDATED:",
                response.data
            );


            setTodos(
                (previousTodos) =>

                    previousTodos.map(
                        (item) =>

                            item._id === todo._id

                                ? response.data.todo

                                : item
                    )
            );


        } catch (error) {

            console.error(
                "TOGGLE TODO ERROR:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to update todo"
            );

        }
    };


    

    const handleEdit = (todo) => {

        setEditingTodo(todo);


        setEditTitle(
            todo.title
        );


        setEditDescription(
            todo.description || ""
        );

    };


  

    const handleSaveEdit = async () => {

        if (!editTitle.trim()) {

            setError(
                "Task title cannot be empty."
            );

            return;
        }


        try {

            setError("");


            const token =
                localStorage.getItem("token");


            const response =
                await api.put(

                    `/todos/${editingTodo._id}`,

                    {
                        title:
                            editTitle.trim(),

                        description:
                            editDescription.trim(),

                        completed:
                            editingTodo.completed,
                    },

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );


            console.log(
                "EDIT TODO RESPONSE:",
                response.data
            );


            setTodos(
                (previousTodos) =>

                    previousTodos.map(
                        (item) =>

                            item._id ===
                            editingTodo._id

                                ? response.data.todo

                                : item
                    )
            );


            setEditingTodo(null);

            setEditTitle("");

            setEditDescription("");


        } catch (error) {

            console.error(
                "EDIT TODO ERROR:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to edit todo"
            );

        }
    };


    

    const handleDelete = async (
        todoId
    ) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this task?"
            );


        if (!confirmDelete) {

            return;

        }


        try {

            setError("");


            const token =
                localStorage.getItem("token");


            await api.delete(

                `/todos/${todoId}`,

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );


            console.log(
                "TODO DELETED:",
                todoId
            );


            setTodos(
                (previousTodos) =>

                    previousTodos.filter(
                        (todo) =>
                            todo._id !== todoId
                    )
            );


        } catch (error) {

            console.error(
                "DELETE TODO ERROR:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to delete todo"
            );

        }
    };


    

    const handleLogout = () => {

        localStorage.removeItem(
            "token"
        );


        localStorage.removeItem(
            "user"
        );


        window.location.href =
            "/login";

    };


   

    const filteredTodos =
        todos.filter((todo) => {


            

            if (
                filter === "pending" &&
                todo.completed
            ) {

                return false;

            }


            if (
                filter === "completed" &&
                !todo.completed
            ) {

                return false;

            }


           

            const search =
                searchTerm
                    .toLowerCase()
                    .trim();


            if (!search) {

                return true;

            }


            const title =
                todo.title?.toLowerCase() ||
                "";


            const description =
                todo.description?.toLowerCase() ||
                "";


            return (
                title.includes(search) ||
                description.includes(search)
            );

        });


   

    if (loading) {

        return (

            <div className="loading-screen">

                <div className="loader"></div>

                <p>
                    Loading your todos...
                </p>

            </div>

        );

    }



    return (

        <div className="dashboard">


            

            <Sidebar
                onLogout={handleLogout}
                todos={todos}
            />


           
            <main className="main-content">


               

                <Navbar
                    user={user}
                />


               

                {error && (

                    <div className="error-message">

                        {error}

                    </div>

                )}


              

                <Stats
                    todos={todos}
                />


               

                <section className="add-section">


                    <div className="section-heading">

                        <h2>
                            Create a new task
                        </h2>


                        <p>
                            Stay organized and get things done.
                        </p>

                    </div>


                    <ToDoForm
                        onTodoAdded={
                            handleTodoAdded
                        }
                    />


                </section>


               

                <section className="todos-section">


                   

                    <div className="todos-header">


                        <div>

                            <h2>
                                Your Tasks
                            </h2>


                            <p>

                                {todos.length === 0

                                    ? "You don't have any tasks yet."

                                    : `${filteredTodos.length} of ${todos.length} task${
                                        todos.length !== 1
                                            ? "s"
                                            : ""
                                    } shown`

                                }

                            </p>

                        </div>


                       

                        <div className="search-container">


                            <span className="search-icon">
                                🔍
                            </span>


                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(
                                        e.target.value
                                    )
                                }
                            />


                            {searchTerm && (

                                <button
                                    className="clear-search"
                                    onClick={() =>
                                        setSearchTerm("")
                                    }
                                >
                                    ×
                                </button>

                            )}


                        </div>


                    </div>


                    

                    <div className="task-filters">


                        {/* ALL */}

                        <button
                            className={
                                filter === "all"
                                    ? "filter-button active"
                                    : "filter-button"
                            }
                            onClick={() =>
                                setFilter("all")
                            }
                        >

                            All

                            <span>
                                {todos.length}
                            </span>

                        </button>


                        {/* PENDING */}

                        <button
                            className={
                                filter === "pending"
                                    ? "filter-button active"
                                    : "filter-button"
                            }
                            onClick={() =>
                                setFilter("pending")
                            }
                        >

                            Pending

                            <span>

                                {
                                    todos.filter(
                                        (todo) =>
                                            !todo.completed
                                    ).length
                                }

                            </span>

                        </button>


                        {/* COMPLETED */}

                        <button
                            className={
                                filter === "completed"
                                    ? "filter-button active"
                                    : "filter-button"
                            }
                            onClick={() =>
                                setFilter("completed")
                            }
                        >

                            Completed

                            <span>

                                {
                                    todos.filter(
                                        (todo) =>
                                            todo.completed
                                    ).length
                                }

                            </span>

                        </button>


                    </div>


                    

                    {filteredTodos.length === 0 ? (

                        <div className="empty-state">


                            <div className="empty-icon">

                                {searchTerm
                                    ? "🔍"
                                    : "✓"
                                }

                            </div>


                            <h3>

                                {searchTerm

                                    ? "No matching tasks"

                                    : filter === "pending"

                                        ? "No pending tasks"

                                        : filter === "completed"

                                            ? "No completed tasks"

                                            : "No tasks yet"

                                }

                            </h3>


                            <p>

                                {searchTerm

                                    ? "Try searching for something else."

                                    : filter !== "all"

                                        ? "Change the filter to see other tasks."

                                        : "Add your first task above and start getting things done."

                                }

                            </p>


                        </div>

                    ) : (


                        <div className="todo-list">


                            {filteredTodos.map(
                                (todo) => (

                                    <ToDoItem

                                        key={
                                            todo._id
                                        }

                                        todo={
                                            todo
                                        }

                                        onToggle={
                                            handleToggleTodo
                                        }

                                        onEdit={
                                            handleEdit
                                        }

                                        onDelete={
                                            handleDelete
                                        }

                                    />

                                )
                            )}


                        </div>

                    )}


                </section>


            </main>


           

            {editingTodo && (

                <div className="modal-overlay">


                    <div className="edit-modal">


                        <h2>
                            Edit Task
                        </h2>


                        {/* TITLE */}

                        <div className="input-group">

                            <label>
                                Task title
                            </label>


                            <input
                                type="text"
                                value={
                                    editTitle
                                }
                                onChange={(e) =>
                                    setEditTitle(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div className="input-group">

                            <label>
                                Description
                            </label>


                            <textarea
                                value={
                                    editDescription
                                }
                                onChange={(e) =>
                                    setEditDescription(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        {/* MODAL BUTTONS */}

                        <div className="modal-actions">


                            <button
                                className="cancel-button"
                                onClick={() =>
                                    setEditingTodo(
                                        null
                                    )
                                }
                            >

                                Cancel

                            </button>


                            <button
                                className="save-button"
                                onClick={
                                    handleSaveEdit
                                }
                            >

                                Save Changes

                            </button>


                        </div>


                    </div>

                </div>

            )}


        </div>

    );

}


export default Dashboard;
