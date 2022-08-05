import { Grid, List, ListItem, ListItemText } from '@mui/material';
import Container from '@mui/material/Container';
import TextInput from './TextInput';

export default function GameChat(props: { messages: string[], onMessage: Function }) {
    return (
        <Container maxWidth={false} sx={{ background: 'green' }}>
            <Grid container spacing={2}>
                <Grid item xs={11}
                >
                    <List sx={{ overflow: 'clip', bgcolor: 'red', maxHeight: '70vh' }}
                    >
                        {
                            props.messages.reverse().map((message: string, key: number) =>
                                <ListItem key={key}>
                                    <ListItemText primary={message} />
                                </ListItem>
                            )
                        }
                    </List>
                </Grid >
                <Grid item xs={11}>
                    <TextInput onInputValidated={props.onMessage} />
                </Grid >
            </Grid >
        </ Container >
    );
}
