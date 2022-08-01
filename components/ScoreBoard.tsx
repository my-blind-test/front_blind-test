import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import { ConnectedUser } from '../utils/interfaces/ConnectedUser';

function User(props: ListChildComponentProps) {
    const { data, index, style } = props;

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={data[index].name} secondary={`${data[index].score} points`} />
            </ListItemButton>
        </ListItem>
    );
}

export default function ScoreBoard(props: { data: ConnectedUser[] }) {
    return (
        <div>
            <h3>Score board</h3>
            <Box
                sx={{ width: '100%', height: 300, maxWidth: 250, bgcolor: 'background.paper' }}
            >
                <VariableSizeList
                    height={300}
                    width={250}
                    itemSize={() => 50}
                    itemCount={props.data.length}
                    itemData={props.data}
                >
                    {User}
                </VariableSizeList>
            </Box>
        </div>
    );
}
