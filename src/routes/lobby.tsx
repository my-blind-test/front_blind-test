import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getStoredAccessToken } from '../utils/accessToken';

const socket = io("http://localhost:3000/lobby", {
    auth: {
        token: "getStoredAccessTok"
        // token: getStoredAccessToken()
    }
});

export default function Lobby() {
    // const [connectedUsers, setConnectedUsers] = useState([]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log("Connected")
        });

        socket.on('disconnect', () => {
            console.log("Disconnected")
        });

        socket.on('users', (data) => {
            console.log(data)
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('users');
        };
    }, []);

    return (
        <div className="Lobby">
            <h1>Lobby</h1>
            <Button color="inherit"
                onClick={() => {
                    socket.emit("createGame", { name: "Hello", password: "password" })
                }}>
                Create Game
            </Button>

        </div>
    );
}