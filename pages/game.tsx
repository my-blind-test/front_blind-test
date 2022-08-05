import { Box, Container, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Dancefloor from '../components/Dancefloor'
import { getStoredAccessToken } from '../utils/accessToken';
import { ConnectedUser } from '../utils/interfaces/ConnectedUser';
import { GameStatus } from '../utils/interfaces/Game';

export default function Game() {
    const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([])
    const [isGameRunning, setIsGameRunning] = useState<boolean>(false)
    const socket: any = useRef(null)
    const audio: any = useRef(null)
    const router = useRouter();
    const { id } = router.query

    useEffect(() => {
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
            if (response.content?.gameStatus === GameStatus.RUNNING) {
                setIsGameRunning(true)
            } else {
                audio.current.src = response.content.trackUrl
                audio.current.play() //Embetant parce que l'user n'a pas encore crée interact, il faudrait emit et recevoir autre chose
            }
            setConnectedUsers(response.content.users)
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
            });

            socket.current.on('userLeft', (data: any) => {
                setConnectedUsers(connectedUsers.filter(connectedUser => connectedUser.clientId !== data));
            });

            socket.current.on('gameStarted', (data: any) => {
                setIsGameRunning(true);
            });

            socket.current.on('newTrack', (data: any) => {
                console.log("New track")
                audio.current.src = data.url
                audio.current.play()
            });

            socket.current.on('gameFinished', (data: any) => {
                console.log("GAME FINISHED", data)
            });

            socket.current.on('gameDeleted', (data: any) => {
                router.push(`/lobby`);
            });

            socket.current.on('guess', (data: any) => {
                switch (data.answer) {
                    case 'none':
                        console.log(`Player ${data.clientId} guessed ${data.guess} : FAIL`)
                        break;
                    case 'song':
                        console.log(`Player ${data.clientId} Found the name of the song`)
                        break;
                    case 'artist':
                        console.log(`Player ${data.clientId} Found the name of the artist`)
                        break;
                    case 'both':
                        console.log(`Player ${data.clientId} Found both of song name and artist`)
                        break;
                }
            });

            socket.current.on('message', (data: any) => {
                console.log(`Message from ${data.clientId} : ${data.message}`)
            });

            socket.current.on("connect_error", (err: any) => {
                console.log("ERROR")
                console.log(err)
            });
        }
    }, [connectedUsers, router])

    const startGame = () => {
        socket.current.emit('startGame', null)
    }

    const deleteGame = () => {
        socket.current.emit('deleteGame', null)
    }

    const onTextInput = (event: any) => {
        if (event.key == "Enter") {
            socket.current.emit('guess', event.target.value)
            event.target.value = ""
        }
    }

    const message = (e: React.ChangeEvent<HTMLInputElement>) => {
        // if (e.keyCode == 13) {
        //     socket.current.emit('message', e.target.value)
        //     e.target.value = ""
        // }
    }

    return (
        <Container maxWidth={false}>
            <Grid container spacing={2} alignItems="flex-start" sx={{ flexDirection: { xs: "column", sm: "row" } }} >
                <Grid item container spacing={3} direction={'column'} xs={12} sm={9}
                    display="flex"
                    alignContent='center'
                    justifyContent="center"
                >
                    <Grid item xs={10}>
                        <Dancefloor />
                    </Grid>
                    <Grid item xs={2}>
                        <Container sx={{ background: 'yellow' }}>
                            <TextField fullWidth autoFocus={true} onKeyUp={onTextInput} />
                        </Container >
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Box
                        sx={{
                            border: 2,
                            borderRadius: '20px',
                            width: '100%',
                            height: '90vh',
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );

    // return (
    //     <div className={styles.container}>
    //         <h1>Game</h1>
    //         {/* {isGameRunning && <ScoreBoard data={connectedUsers} />} */}
    //         {!isGameRunning && <Button variant="contained" onClick={startGame}>Start game</Button>}
    //         <Button variant="contained" onClick={deleteGame}>Delete game</Button>
    //         <Dancefloor users={connectedUsers} />
    //         {isGameRunning && <TextField id="guess" label="Guess" variant="outlined" onKeyDown={guess} />}
    //         <TextField id="message" label="Message" variant="outlined" onKeyDown={message} />
    //     </div>
    // )
}