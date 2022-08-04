import { Box, Container, Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import GameList from '../components/GameList';
import { getStoredAccessToken } from '../utils/accessToken';
import { ConnectedUser } from '../utils/interfaces/ConnectedUser';
import { Game, GameStatus } from '../utils/interfaces/Game';

export default function Lobby() {
    const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
    const [games, setGames] = useState<Game[]>([]);
    const socket: any = useRef(null)

    useEffect(() => {
        socket.current = io("http://localhost:3000/lobby", {
            auth: {
                token: getStoredAccessToken()
            }
        });

        return () => {
            if (socket.current)
                socket.current.disconnect();
        };
    }, [])

    useEffect(() => {
        if (socket.current) {
            socket.current.removeAllListeners();

            socket.current.on('connect', () => {
                socket.current.emit('users', null, (response: any) => {
                    setConnectedUsers([...connectedUsers, ...response.content])
                })
                socket.current.emit('games', null, (response: any) => {
                    setGames([...games, ...response.content])
                    console.log(response.content)
                })
                console.log("Connected")
            });

            socket.current.on('disconnect', () => {
                //Ramener à la page home
                // Ca se passe si le jwt n'est pas bon à la connexion et peut etre dans un autre cas
                // Donc peut etre check le JWT à l'entré du lobby
            });

            socket.current.on('userJoined', (data: ConnectedUser) => {
                setConnectedUsers([...connectedUsers, data])
            });

            socket.current.on('userLeft', (data: any) => {
                setConnectedUsers(connectedUsers.filter(connectedUser => connectedUser.clientId !== data));
            });

            socket.current.on('newGame', (data: any) => {
                setGames([...games, data])
            });

            socket.current.on('gameDeleted', (data: any) => {
                setGames(games.filter(game => game.id !== data));
            });

            socket.current.on('gameUpdated', (data: any) => {
                const newGames = [...games]
                newGames[games.findIndex(game => game.id === data.id)] = data
                setGames(newGames);
            });

            socket.current.on("connect_error", (err: any) => {
                console.log("ERROR")
                console.log(err)
            });
        }
    }, [games, connectedUsers])

    const onCreateGame = async (name: string, password: string, playlistUrl: string) => {
        const response = await new Promise(resolve =>
            socket.current.emit('createGame', { name, password, playlistUrl }, (response: any) => resolve(response))
        )

        return response
    }

    return (
        <Container maxWidth={false} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} direction="row" alignItems="flex-start">
                <Grid item xs={12} md={6} lg={4}>
                    <GameList data={games} onCreateGame={onCreateGame} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Box
                        sx={{
                            height: '900px',
                            backgroundColor: 'green',
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={4}>
                    <Box
                        sx={{
                            height: '500px',
                            backgroundColor: 'green',
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}