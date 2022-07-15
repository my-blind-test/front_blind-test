import { Button } from "@mui/material";
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
            <h1>Home page</h1>
            <Link to="/lobby" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <Button color="inherit">
                    Jouer
                </Button>
            </Link>
            <p>Pour l'instant il n'y a pas grand chose mais à terme il y aura :</p>
            <ul>
                <li>Une fake partie qui tounne</li>
                <li>Un super score board</li>
                <li>Une explication des règles</li>
                <li>Une explication de l'univers</li>
            </ul>
        </div>
    );
}