import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';
import { Avatar, Button, Container, Grid, List, ListItemAvatar, ListItemIcon } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CreateGameModal from './CreateGameModal';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { getStoredAccessToken } from '../utils/accessToken';
import { Game } from '../utils/interfaces/Game';
import JoinGameModal from './JoinGameModal';

function GamePreview(props: { game: Game, onGameSelected: Function }) {
    return (
        <ListItem
            key={props.game.id}
            sx={{ marginBottom: "10px", borderRadius: '8%/50%', background: "blue" }}
        >
            <ListItemButton onClick={() => props.onGameSelected(props.game)}>
                <ListItemAvatar>
                    <Avatar
                        alt={`Gaame id ${props.game.id}`}
                        src={`/public/vercel.svg`}
                    />
                </ListItemAvatar>
                <ListItemText primary={props.game.name} secondary={`${props.game.connectedUsers?.length || 0}/${props.game.slots}`} />
                {props.game.isPrivate &&
                    <ListItemIcon>
                        <LockIcon />
                    </ListItemIcon>
                }
            </ListItemButton>
        </ListItem>
    )
}

export default function GameList() {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState<Game | undefined>();
    const [joinModalOpen, setJoinModalOpen] = useState(false);
    const [games, setGames] = useState<Game[]>([]);
    const socket: any = useRef(null)
    const router = useRouter();

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
                setGames([])

                socket.current.emit('games', null, (response: any) => {
                    setGames([...games, ...response.content])
                })
                console.log("Connected")
            });

            socket.current.on('disconnect', () => {
                //Ramener à la page home
                // Ca se passe si le jwt n'est pas bon à la connexion et peut etre dans un autre cas
                // Donc peut etre check le JWT à l'entré du lobby
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
    }, [games])

    const onPlay = () => {
        const openGames = games.filter(game => !game.isPrivate)

        if (!openGames.length) {
            console.log("Pas de games ouvertes") //TODO alert
            return
        }

        router.push(`/game?id=${openGames[Math.floor(Math.random() * openGames.length)].id}`);
    }

    const onGameSelected = (game: Game) => {
        if (!game.isPrivate) {
            router.push(`/game?id=${game.id}`);
        } else {
            setSelectedGame(game)
            setJoinModalOpen(true)
        }
    }

    const onJoinGame = async (password: string) => {
        if (!selectedGame)
            return

        const response: any = await new Promise(resolve =>
            socket.current.emit('joinGame', { id: selectedGame.id, password }, (response: any) => resolve(response))
        )

        if (response.status === 'OK') {
            router.push(`/game?id=${selectedGame.id}`);
        }

        return response
    }

    const onCreateGame = async (name: string, password: string, playlistUrl: string) => {
        const response = await new Promise(resolve =>
            socket.current.emit('createGame', { name, password, playlistUrl }, (response: any) => resolve(response))
        )

        return response
    }

    const onCreateModalClose = (): void => {
        setCreateModalOpen(false)
    }

    const onJoinModalClose = (): void => {
        setJoinModalOpen(false)
    }

    return (
        <Container sx={{ mt: 15, backgroundColor: 'green' }}>
            {createModalOpen && <CreateGameModal open={createModalOpen} onModalClose={onCreateModalClose} onCreateGame={onCreateGame} />}
            {joinModalOpen && <JoinGameModal open={joinModalOpen} onModalClose={onJoinModalClose} onJoinGame={onJoinGame} />}
            <Grid container rowSpacing={15} direction="column" sx={{}}>
                <Grid item container spacing={2} rowSpacing={8} > {/*TODO : align center*/}
                    <Grid item xs={6}>
                        <Button variant="contained" sx={{ borderRadius: '8%/50%', width: '70%' }} onClick={() => onPlay()} > Play</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" sx={{ borderRadius: '8%/50%', width: '70%' }} onClick={() => setCreateModalOpen(true)}>New game</Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <List sx={{ overflow: 'auto', maxHeight: '600px', bgcolor: 'red' }}>
                        {
                            games.map((game: any, key: any) =>
                                <GamePreview game={game} onGameSelected={onGameSelected} key={key} />
                            )
                        }
                    </List>
                </Grid>
            </Grid>
        </Container >
    );
}
