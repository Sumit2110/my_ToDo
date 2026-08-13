function Navbar({ user }) {

    const userName = user?.name || "User";

    const firstLetter =
        userName.charAt(0).toUpperCase();

    return (
        <header className="topbar">

            <div>
                <p className="welcome-small">
                    Welcome back 👋
                </p>

                <h1>
                    My Dashboard
                </h1>
            </div>

            <div className="user-avatar">
                {firstLetter}
            </div>

        </header>
    );
}

export default Navbar;