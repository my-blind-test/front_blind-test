import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import { useRouter } from 'next/router';

function Game(props: ListChildComponentProps) {
    const { data, index, style } = props;
    const router = useRouter();

    const joinGame = () => {
        router.push(`/game?id=${data[index].id}`);
    }

    console.log(data[index])

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={data[index].name} secondary={`${data[index].status} : ${data[index].connectedUsers.length || 0} players connected`} onClick={() => { joinGame() }} />
            </ListItemButton>
        </ListItem>
    );
}

export default function GameList(props: any) {
    console.log(props.data)
    console.log("GAME LIST")
    return (
        <div>
            <h3>Games</h3>
            <Box
                sx={{ width: '100%', height: 300, maxWidth: 250, bgcolor: 'background.paper' }}
            >
                <VariableSizeList
                    height={300}
                    width={250}
                    itemSize={() => 50}
                    itemCount={props.data.length}
                    overscanCount={5}
                    itemData={props.data}
                >
                    {Game}
                </VariableSizeList>
            </Box>
        </div>
    );
}
