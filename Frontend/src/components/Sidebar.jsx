import { useMemo, useState } from "react";

function Sidebar({ onLogout, todos = [] }) {
    const getToday = () => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const [selectedDate, setSelectedDate] = useState(getToday());

    const getDateKey = (dateValue) => {
        if (!dateValue) return null;

        const date = new Date(dateValue);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const dailyData = useMemo(() => {
        const selectedEnd = new Date(`${selectedDate}T23:59:59.999`);

        const created = todos.filter(
            (todo) => getDateKey(todo.createdAt) === selectedDate
        );

        const completed = todos.filter(
            (todo) =>
                todo.completedAt &&
                getDateKey(todo.completedAt) === selectedDate
        );

        const pending = todos.filter((todo) => {
            const createdAt = new Date(todo.createdAt);

            const completedAt = todo.completedAt
                ? new Date(todo.completedAt)
                : null;

            return (
                createdAt <= selectedEnd &&
                (!completedAt || completedAt > selectedEnd)
            );
        });

        return {
            created: created.length,
            completed: completed.length,
            pending: pending.length,
        };
    }, [todos, selectedDate]);

    const changeDate = (amount) => {
        const date = new Date(`${selectedDate}T00:00:00`);

        date.setDate(date.getDate() + amount);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        setSelectedDate(`${year}-${month}-${day}`);
    };

    const goToToday = () => {
        setSelectedDate(getToday());
    };

    const formattedDate = new Date(
        `${selectedDate}T00:00:00`
    ).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });

    return (
        <aside className="sidebar">
            {/* LOGO */}
            <div className="logo">
                <div className="logo-icon">✓</div>

                <span>TaskFlow</span>
            </div>

          
            <nav className="sidebar-nav">
                <div className="nav-item active">
                    <span>▦</span>
                    Dashboard
                </div>

                <div className="nav-item">
                    <span>✓</span>
                    My Tasks
                </div>
            </nav>

          
            <div className="sidebar-activity">
                <div className="sidebar-activity-title">
                    <span>Daily Activity</span>
                </div>

                <button
                    onClick={goToToday}
                    className="sidebar-today"
                >
                    Today
                </button>

              
                <div className="sidebar-date">
                    <button
                        onClick={() => changeDate(-1)}
                    >
                        ‹
                    </button>

                    <span>📅 {formattedDate}</span>

                    <button
                        onClick={() => changeDate(1)}
                    >
                        ›
                    </button>
                </div>

               
                <div className="sidebar-daily-stats">
                    <div className="sidebar-stat">
                        <span className="created-dot">+</span>

                        <div>
                            <strong>{dailyData.created}</strong>
                            <small>Created</small>
                        </div>
                    </div>

                    <div className="sidebar-stat">
                        <span className="completed-dot">✓</span>

                        <div>
                            <strong>{dailyData.completed}</strong>
                            <small>Completed</small>
                        </div>
                    </div>

                    <div className="sidebar-stat">
                        <span className="pending-dot">◷</span>

                        <div>
                            <strong>{dailyData.pending}</strong>
                            <small>Pending</small>
                        </div>
                    </div>
                </div>
            </div>

           
            <button
                className="logout-button"
                onClick={onLogout}
            >
                <span>↪</span>
                Logout
            </button>
        </aside>
    );
}

export default Sidebar;
