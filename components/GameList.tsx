import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import { useRouter } from 'next/router';
import { Game } from '../utils/interfaces/Game';
import { Avatar, Button, Container, Grid, List, ListItemAvatar, ListItemIcon } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CreateGameModal from './CreateGame';

function GamePreview(props: { game: Game }) {
    const router = useRouter();

    const joinGame = () => {
        router.push(`/game?id=${props.game.id}`);
    }

    return (
        <ListItem
            key={props.game.id}
            sx={{ marginBottom: "10px", borderRadius: '8%/50%', background: "blue" }}
        >
            <ListItemButton onClick={() => { joinGame() }}>
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

export default function GameList(props: { data: Game[], onCreateGame: Function }) {
    const [createGameModalOpen, setCreateGameModalOpen] = React.useState(false);

    const onModalClose = (): void => {
        setCreateGameModalOpen(false)
    }

    return (
        <Container sx={{ backgroundColor: 'green' }}>
            {createGameModalOpen && <CreateGameModal open={createGameModalOpen} onModalClose={onModalClose} onCreateGame={props.onCreateGame} />}
            <Grid container rowSpacing={8} direction="column" sx={{}}>
                <Grid item container spacing={2} rowSpacing={8} > {/*TODO : align center*/}
                    <Grid item xs={6}>
                        <Button variant="contained" sx={{ borderRadius: '8%/50%', width: '70%' }}>Play</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" sx={{ borderRadius: '8%/50%', width: '70%' }} onClick={() => setCreateGameModalOpen(true)}>New game</Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <List sx={{ overflow: 'auto', maxHeight: '600px', bgcolor: 'red' }}>
                        {
                            props.data.map((game: any, key: any) =>
                                <GamePreview game={game} key={key} />
                            )
                        }
                    </List>
                </Grid>
            </Grid>
        </Container >
    );
}
