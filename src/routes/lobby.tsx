import { Alert, Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import CreateGame from '../Components/CreateGame';
import Dancefloor from '../Components/Dancefloor';
import List from '../Components/List';
import { getStoredAccessToken } from '../utils/accessToken';

const socket = io("http://localhost:3000/lobby", {
    auth: {
        token: getStoredAccessToken()
    }
});

//Voir les petits bonhommes de tout le monde au lobby (only les 20 plus haut lvl)
// update/delete une Game
// Rejoindre une game
// Voir les petits bonhomes de tout le monde dans la game
// Envoyer des messages dans la game
// Avoir un scoreboard dans la game
// Deviner une musique dans la game
// Jouer une musique dans la game
// Déguiser les petits bonhommes

export default function Lobby() {
    const [errorMessage, setErrorMessage] = useState("");
    const [connectedUsers, setConnectedUsers] = useState({});
    const [games, setGames] = useState({});

    useEffect(() => {
        socket.on('connect', () => {
            socket.emit('users', null, (response: any) => {
                setConnectedUsers(response.content)
            })
            socket.emit('games', null, (response: any) => {
                setGames({ ...games, ...response.content })
            })
            console.log("Connected")
        });

        socket.on('disconnect', () => {
        });

        socket.on('userJoined', (data) => {
            setConnectedUsers({ ...connectedUsers, ...data })
        });

        socket.on('userLeft', (data) => {
            const newList = { ...connectedUsers }

            delete newList[data as keyof {}];
            setConnectedUsers(newList)
        });

        socket.on('newGame', (data) => {
            setGames({ ...games, ...data })
        });

        socket.on("connect_error", (err) => {
            console.log("ERROR")
            console.log(err)
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('userJoined');
            socket.off('userLeft');
            socket.off('connect_error');
        };
    }, [connectedUsers, games]);

    const onCreateGame = (name: string, password: string) => {
        socket.emit("createGame", { name, password }, (response: any) => {
            setErrorMessage(response.status === 'OK' ? "" : response.content)
        })
    }

    return (
        <div className="Lobby">
            <h1>Lobby</h1>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={5}>
                    <Grid item xs>
                        <List listName="Games" data={games} />
                    </Grid>
                    <Grid item xs>
                        <CreateGame onCreateGame={(name: string, password: string) => onCreateGame(name, password)} />
                        {errorMessage &&
                            <Alert variant="outlined" severity="error" sx={{ mt: 2, mb: 2, display: 'line' }} >
                                {errorMessage}
                            </Alert>
                        }
                    </Grid>
                </Grid>
            </Box>
            <Dancefloor users={connectedUsers} />
        </div >
    );
}