function Stats({ todos }) {

    const completedTodos =
        todos.filter(
            (todo) => todo.completed
        ).length;


    const pendingTodos =
        todos.filter(
            (todo) => !todo.completed
        ).length;


    return (

        <section className="stats-grid">

        

            <div className="stat-card">

                <div className="stat-icon purple">
                    ✓
                </div>

                <div>

                    <p>
                        Total Tasks
                    </p>

                    <h2>
                        {todos.length}
                    </h2>

                </div>

            </div>


          

            <div className="stat-card">

                <div className="stat-icon orange">
                    ◷
                </div>

                <div>

                    <p>
                        Pending
                    </p>

                    <h2>
                        {pendingTodos}
                    </h2>

                </div>

            </div>


          

            <div className="stat-card">

                <div className="stat-icon green">
                    ✓
                </div>

                <div>

                    <p>
                        Completed
                    </p>

                    <h2>
                        {completedTodos}
                    </h2>

                </div>

            </div>

        </section>
    );
}

export default Stats;
