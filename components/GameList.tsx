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

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={data[index].name} onClick={() => { joinGame() }} />
            </ListItemButton>
        </ListItem>
    );
}

export default function GameList(props: any) {
    return (
        <div>
            <h3>{props.listName}</h3>
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
