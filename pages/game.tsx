import { Box, Button, Container, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Dancefloor from '../components/Dancefloor'
import GameChat from '../components/GameChat';
import TextInput from '../components/TextInput';
import { getStoredAccessToken } from '../utils/accessToken';
import { ConnectedUser } from '../utils/interfaces/ConnectedUser';
import { GameStatus } from '../utils/interfaces/Game';

export default function Game() {
    const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([])
    const [isGameRunning, setIsGameRunning] = useState<boolean>(false)
    const [messages, setMessages] = useState<string[]>([])
    const socket: any = useRef(null)
    const audio: any = useRef(null)
    const router = useRouter();
    const { id } = router.query

    useEffect(() => {
        if (socket.current) return

        audio.current = new Audio()

        socket.current = io("http://localhost:3000/game", {
            auth: {
                token: getStoredAccessToken()
            }
        });

        socket.current.emit("joinGame", { id }, (response: any) => {
            if (response.status !== 'OK') {
                router.push(`/lobby`);
            }
            setConnectedUsers(response.content.users)

            if (response.content?.gameStatus === GameStatus.RUNNING) {
                setIsGameRunning(true)
            } else {
                audio.current.src = response.content.trackUrl
                audio.current.play() //Embetant parce que l'user n'a pas encore crée interact, il faudrait emit et recevoir autre chose
            }
        })

        socket.current.emit("gameStatus", null, (response: any) => {
            if (response.status !== 'OK') {
                router.push(`/lobby`);
            }
        })

        return () => {
            if (audio.current) {
                audio.current.pause()
            }
            if (socket.current) {
                socket.current.disconnect();
            }
        };

    }, [router, id])

    useEffect(() => {
        if (socket.current) {
            socket.current.removeAllListeners();

            socket.current.on('connect', () => {
                console.log("Connected")
            });

            socket.current.on('disconnect', () => {
                // router.push(`/lobby`);
            });

            socket.current.on('userJoined', (data: ConnectedUser) => {
                setConnectedUsers([...connectedUsers, data])
                setMessages([...messages, `${data.name} joined the battle !`])
            });

            socket.current.on('userLeft', (data: any) => {
                setConnectedUsers(connectedUsers.filter(connectedUser => connectedUser.clientId !== data));
                setMessages([...messages, `${data.name} left the battle ...`])
            });

            socket.current.on('gameStarted', (data: any) => {
                setIsGameRunning(true);
                setMessages([...messages, `INFO : Game started`])
            });

            socket.current.on('newTrack', (data: any) => {
                audio.current.src = data.url
                audio.current.play()
                setMessages([...messages, `INFO : New track playing`])
            });

            socket.current.on('gameFinished', (data: any) => {
                setMessages([...messages, `INFO : Game finished`])
            });

            socket.current.on('gameDeleted', (data: any) => {
                router.push(`/lobby`);
            });

            socket.current.on('guess', (data: any) => {
                const user: ConnectedUser | undefined = connectedUsers.find(user => user.clientId === data.clientId)

                switch (data.answer) {
                    case 'none':
                        setMessages([...messages, `${user?.name} guessed ${data.guess} : FAIL`])
                        break;
                    case 'song':
                        setMessages([...messages, `${user?.name} Found the name of the song`])
                        break;
                    case 'artist':
                        setMessages([...messages, `${user?.name} Found the name of the artist`])
                        break;
                    case 'both':
                        setMessages([...messages, `${user?.name} Found both of song name and artist`])
                        break;
                }
            });

            socket.current.on('message', (data: any) => {
                const user: ConnectedUser | undefined = connectedUsers.find(user => user.clientId === data.clientId)

                setMessages([...messages, `${user?.name} : ${data.message}`])
            });

            socket.current.on("connect_error", (err: any) => {
                console.log(err)
            });
        }
    }, [connectedUsers, messages, router])

    const startGame = () => {
        socket.current.emit('startGame', null)
    }

    const onGuess = (guess: string) => {
        socket.current.emit('guess', guess)
    }

    const onMessage = (message: string) => {
        socket.current.emit('message', message)
    }

    return (
        <Container maxWidth={false}>
            <Grid container spacing={2} alignItems="center" sx={{ flexDirection: { xs: "column", sm: "row" } }}>
                <Grid item container spacing={3} direction={'column'} xs={12} sm={9}
                    display="flex"
                    alignContent='center'
                    justifyContent="center"
                >
                    <Grid item xs={10}>
                        <Dancefloor users={connectedUsers} />
                    </Grid>
                    <Grid item xs={2} display="flex"
                        alignContent='center'
                        justifyContent="center"
                    >
                        {isGameRunning &&
                            <TextInput onInputValidated={onGuess} />
                        }
                        {!isGameRunning &&
                            <Button variant="contained" sx={{ borderRadius: '8%/50%', width: '70%', maxWidth: '300px' }} onClick={() => startGame()} > Play</Button>
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={3}
                    display="flex"
                    alignItems='flex-end'
                >
                    <GameChat messages={messages} onMessage={onMessage} />
                </Grid>
            </Grid>
        </Container>
    );
}