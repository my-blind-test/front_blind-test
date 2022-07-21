import { Alert, Box, Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import CreateGame from '../components/CreateGame';
import Dancefloor from '../components/Dancefloor';
import List from '../components/List';
import styles from '../styles/Home.module.css'
import { getStoredAccessToken } from '../utils/accessToken';

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
    const [connectedUsers, setConnectedUsers] = useState<{ name: string, id: string, clientId: string }[]>([]);
    const [games, setGames] = useState<{ name: string, id: string }[]>([]);
    const socket: any = useRef(null)

    useEffect(() => {
        if (!socket.current) {
            socket.current = io("http://localhost:3000/lobby", {
                auth: {
                    token: getStoredAccessToken()
                }
            });
        }

        return () => {
            if (!socket.current)
                return
            socket.current.off('connect');
            socket.current.off('disconnect');
            socket.current.off('userJoined');
            socket.current.off('userLeft');
            socket.current.off('newGame');
            socket.current.off('connect_error');
        };
    }, [])

    useEffect(() => {
        if (socket.current) {
            socket.current.on('connect', () => {
                socket.current.emit('users', null, (response: any) => {
                    setConnectedUsers([...connectedUsers, ...response.content])
                })
                socket.current.emit('games', null, (response: any) => {
                    setGames([...games, ...response.content])
                })
                console.log("Connected")
            });

            socket.current.on('disconnect', () => {
            });

            socket.current.on('userJoined', (data: any) => { //TODO : créer un type/interface data
                setConnectedUsers([...connectedUsers, data])
            });

            socket.current.on('userLeft', (data: any) => {
                setConnectedUsers(connectedUsers.filter(connectedUser => connectedUser.clientId !== data));
            });

            socket.current.on('newGame', (data: any) => {
                console.log(data)
                setGames([...games, data])
            });

            socket.current.on("connect_error", (err: any) => {
                console.log("ERROR")
                console.log(err)
            });
        }
    }, [games, connectedUsers])

    const onCreateGame = (name: string, password: string) => {
        socket.current.emit("createGame", { name, password }, (response: any) => {
            setErrorMessage(response.status === 'OK' ? "" : response.content)
        })
    }

    return (
        <div className={styles.container}>
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