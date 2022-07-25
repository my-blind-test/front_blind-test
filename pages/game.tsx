import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Dancefloor from '../components/Dancefloor'
import styles from '../styles/Home.module.css'
import { getStoredAccessToken } from '../utils/accessToken';

export default function Game() {
    const [connectedUsers, setConnectedUsers] = useState<{ name: string, id: string, clientId: string, score: number }[]>([])
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
            socket.current.emit('users', null, (response: any) => {
                setConnectedUsers(response.content)
            })
        })

        return () => {
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
            });

            socket.current.on('userJoined', (data: any) => {
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
                console.log("Guess", data)
            });

            socket.current.on('message', (data: any) => {
                console.log("message", data)
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

    const guess = (e: any) => {
        if (e.keyCode == 13) {
            console.log("send guess")
            socket.current.emit('guess', e.target.value)
            e.target.value = ""
        }
    }

    const message = (e: any) => {
        if (e.keyCode == 13) {
            console.log("Send message")
            socket.current.emit('message', e.target.value)
            e.target.value = ""
        }
    }

    return (
        <div className={styles.container}>
            <h1>Game</h1>
            {!isGameRunning && <Button variant="contained" onClick={startGame}>Start game</Button>}
            <Button variant="contained" onClick={deleteGame}>Delete game</Button>
            <Dancefloor users={connectedUsers} />
            <TextField id="guess" label="Guess" variant="outlined" onKeyDown={guess} />
            <TextField id="message" label="Message" variant="outlined" onKeyDown={message} />
        </div>
    )
}