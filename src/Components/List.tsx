import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { VariableSizeList, ListChildComponentProps } from 'react-window';

function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={data[Object.keys(data)[index]].name} />
            </ListItemButton>
        </ListItem>
    );
}

export default function UserList(props: any) {
    const dataCount = Object.keys(props.data).length

    return (
        <div>
            <h3>{props.listName}</h3>
            <Box
                sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
            >
                <VariableSizeList
                    height={400}
                    width={360}
                    itemSize={() => 50}
                    itemCount={dataCount}
                    overscanCount={5}
                    itemData={props.data}
                >
                    {renderRow}
                </VariableSizeList>
            </Box>
        </div>
    );
}
