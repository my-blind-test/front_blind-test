import React from "react";
import { Link } from "react-router-dom";
import HomeBar from "../Components/HomeBar";
import { useCurrentUser } from "../utils/CurrentUserContext";

export default function Home() {
    const { fetchCurrentUser } = useCurrentUser()

    React.useEffect(() => { fetchCurrentUser() })

    return (
        <div className="Home">
            <HomeBar />
            <h1>Home</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/lobby">Lobby</Link>
                    </li>
                    <li>
                        <Link to="/game">Game</Link>
                    </li>
                    <li>
                        <Link to="/user">User</Link>
                    </li>
                    <li>
                        <Link to="/login">SignIn</Link>
                    </li>
                    <li>
                        <Link to="/register">SignUp</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}