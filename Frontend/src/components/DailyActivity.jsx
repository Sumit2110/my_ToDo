import { useMemo } from "react";


function DailyActivity({
    todos,
    selectedDate
}) {


    // =========================
    // DATE FORMAT
    // =========================

    const formatDate = (dateString) => {

        const date = new Date(
            `${dateString}T00:00:00`
        );


        return date.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
            }
        );
    };


    // =========================
    // LOCAL DATE KEY
    // =========================

    const getDateKey = (dateValue) => {

        if (!dateValue) {
            return null;
        }


        const date =
            new Date(dateValue);


        const year =
            date.getFullYear();


        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");


        const day =
            String(
                date.getDate()
            ).padStart(2, "0");


        return `${year}-${month}-${day}`;
    };


    // =========================
    // DAILY DATA
    // =========================

    const dailyData = useMemo(() => {

        // =========================
        // CREATED TASKS
        // =========================

        const createdTasks =
            todos.filter(
                (todo) =>

                    getDateKey(
                        todo.createdAt
                    ) === selectedDate
            );


        // =========================
        // COMPLETED TASKS
        // =========================

        const completedTasks =
            todos.filter(
                (todo) =>

                    todo.completedAt &&

                    getDateKey(
                        todo.completedAt
                    ) === selectedDate
            );


        // =========================
        // SELECTED DAY END
        // =========================

        const selectedDateEnd =
            new Date(
                `${selectedDate}T23:59:59.999`
            );


        // =========================
        // PENDING TASKS
        // =========================

        const pendingTasks =
            todos.filter(
                (todo) => {

                    const createdAt =
                        new Date(
                            todo.createdAt
                        );


                    const completedAt =
                        todo.completedAt
                            ? new Date(
                                todo.completedAt
                            )
                            : null;


                    const existedThatDay =
                        createdAt <=
                        selectedDateEnd;


                    const notCompletedYet =
                        !completedAt ||
                        completedAt >
                        selectedDateEnd;


                    return (
                        existedThatDay &&
                        notCompletedYet
                    );

                }
            );


        // =========================
        // TOTAL TASKS FOR DAY
        // =========================

        const selectedDateStart =
            new Date(
                `${selectedDate}T00:00:00`
            );


        const tasksExistingBefore =
            todos.filter(
                (todo) => {

                    const created =
                        new Date(
                            todo.createdAt
                        );


                    return (
                        created <
                        selectedDateStart
                    );

                }
            );


        const stillExistingFromBefore =
            tasksExistingBefore.filter(
                (todo) => {

                    const completed =
                        todo.completedAt
                            ? new Date(
                                todo.completedAt
                            )
                            : null;


                    return (
                        !completed ||
                        completed >
                        selectedDateEnd
                    );

                }
            );


        const totalTasksForDay =
            createdTasks.length +
            stillExistingFromBefore.length;


        // =========================
        // COMPLETION RATE
        // =========================

        const completedCount =
            completedTasks.length;


        const completionRate =
            totalTasksForDay > 0

                ? Math.round(
                    (
                        completedCount /
                        totalTasksForDay
                    ) * 100
                )

                : 0;


        return {

            createdTasks,

            completedTasks,

            pendingTasks,

            totalTasksForDay,

            completionRate,

        };

    }, [todos, selectedDate]);


    // =========================
    // EVENT TIME
    // =========================

    const formatTime = (dateValue) => {

        if (!dateValue) {
            return "";
        }


        return new Date(
            dateValue
        ).toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };


    // =========================
    // TOTAL EVENTS
    // =========================

    const totalEvents =
        dailyData.createdTasks.length +
        dailyData.completedTasks.length;


    // =========================
    // RENDER
    // =========================

    return (

        <section className="daily-activity">


            {/* =========================
                HEADER
            ========================= */}

            <div className="daily-header">

                <div>

                    <h2>
                        Daily Activity
                    </h2>

                    <p>
                        Track your productivity day by day.
                    </p>

                </div>


                <div className="daily-selected-date">

                    📅 {formatDate(selectedDate)}

                </div>

            </div>


            {/* =========================
                DAILY STATISTICS
            ========================= */}

            <div className="daily-stats">


                {/* CREATED */}

                <div className="daily-stat-card">

                    <div className="daily-stat-icon created-icon">
                        +
                    </div>

                    <div>

                        <p>
                            Tasks Created
                        </p>

                        <h3>
                            {
                                dailyData
                                    .createdTasks
                                    .length
                            }
                        </h3>

                    </div>

                </div>


                {/* COMPLETED */}

                <div className="daily-stat-card">

                    <div className="daily-stat-icon completed-icon">
                        ✓
                    </div>

                    <div>

                        <p>
                            Completed
                        </p>

                        <h3>
                            {
                                dailyData
                                    .completedTasks
                                    .length
                            }
                        </h3>

                    </div>

                </div>


                {/* PENDING */}

                <div className="daily-stat-card">

                    <div className="daily-stat-icon pending-icon">
                        ◷
                    </div>

                    <div>

                        <p>
                            Pending
                        </p>

                        <h3>
                            {
                                dailyData
                                    .pendingTasks
                                    .length
                            }
                        </h3>

                    </div>

                </div>


                {/* COMPLETION RATE */}

                <div className="daily-stat-card">

                    <div className="daily-stat-icon rate-icon">
                        %
                    </div>

                    <div>

                        <p>
                            Completion Rate
                        </p>

                        <h3>
                            {
                                dailyData
                                    .completionRate
                            }%
                        </h3>

                    </div>

                </div>

            </div>


            {/* =========================
                ACTIVITY
            ========================= */}

            <div className="daily-task-section">


                <div className="daily-task-header">

                    <h3>
                        Activity
                    </h3>

                    <span>
                        {totalEvents} events
                    </span>

                </div>


                {/* =========================
                    NO ACTIVITY
                ========================= */}

                {totalEvents === 0 ? (

                    <div className="daily-empty">

                        <div className="daily-empty-icon">
                            📅
                        </div>

                        <h3>
                            No activity
                        </h3>

                        <p>
                            You don't have any task
                            activity on this date.
                        </p>

                    </div>

                ) : (

                    <div className="activity-list">


                        {/* =========================
                            CREATED TASKS
                        ========================= */}

                        {dailyData.createdTasks.map(
                            (todo) => (

                                <div
                                    className="activity-item"
                                    key={`created-${todo._id}`}
                                >

                                    <div className="activity-dot created-dot">
                                        +
                                    </div>


                                    <div className="activity-info">

                                        <strong>
                                            {todo.title}
                                        </strong>

                                        <span>
                                            Task created
                                        </span>

                                    </div>


                                    <div className="activity-time">

                                        {formatTime(
                                            todo.createdAt
                                        )}

                                    </div>

                                </div>

                            )
                        )}


                        {/* =========================
                            COMPLETED TASKS
                        ========================= */}

                        {dailyData.completedTasks.map(
                            (todo) => (

                                <div
                                    className="activity-item"
                                    key={`completed-${todo._id}`}
                                >

                                    <div className="activity-dot completed-dot">
                                        ✓
                                    </div>


                                    <div className="activity-info">

                                        <strong>
                                            {todo.title}
                                        </strong>

                                        <span>
                                            Task completed
                                        </span>

                                    </div>


                                    <div className="activity-time">

                                        {formatTime(
                                            todo.completedAt
                                        )}

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </section>
    );
}


export default DailyActivity;