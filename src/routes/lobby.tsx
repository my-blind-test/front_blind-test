import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import UserList from '../Components/UserList';
import { getStoredAccessToken } from '../utils/accessToken';

const socket = io("http://localhost:3000/lobby", {
    auth: {
        token: getStoredAccessToken()
    }
});

export default function Lobby() {
    const [connectedUsers, setConnectedUsers] = useState({});

    useEffect(() => {
        socket.on('connect', () => {
            socket.emit('users', null, (response: any) => {
                console.log("Users")
                console.log(response.content)
                setConnectedUsers(response.content)
            })
            socket.emit('games', null, (response: any) => {
                console.log("Games")
                console.log(response)
            })
            console.log("Connected")
        });

        socket.on('disconnect', () => {
            console.log("Disconnected")
        });

        socket.on('userJoined', (data) => {
            console.log("User joined")
            console.log(connectedUsers)
            console.log(data)
            console.log({ ...connectedUsers, ...data })
            setConnectedUsers({ ...connectedUsers, ...data })
        });

        socket.on('userLeft', (data) => {
            console.log("User left")
            console.log(data)
            if (data) {
                const newList = { ...connectedUsers }

                delete newList[data as keyof {}];
                setConnectedUsers(newList)
            }
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
    }, [connectedUsers]);

    return (
        <div className="Lobby">
            <h1>Lobby</h1>
            {Object.keys(connectedUsers).length}
            <UserList users={connectedUsers} />
            <Button color="inherit"
                onClick={() => {
                    socket.emit("createGame", { name: "Hello", password: "password" }, (response: unknown) => {
                        console.log(response);
                    })
                }}>
                Create Game
            </Button>

        </div >
    );
}