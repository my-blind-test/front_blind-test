import { Grid, List, ListItem, ListItemText } from '@mui/material';
import Container from '@mui/material/Container';
import TextInput from './TextInput';

export default function GameChat(props: any) {
    const messages = ["First", "Raphael joined the battle", "New challenger", "tgmetmcdp", "New challenger", "tgmetmcdp", "allehopu", "Hello", "Raphael joined the battle", "New challenger", "tgmetmcdp", "allehopu", "New challenger", "tgmetmcdp", "allehopu", "New challenger", "tgmetmcdp", "allehopu", "New challenger", "tgmetmcdp", "Last",]

    return (
        <Container maxWidth={false} sx={{ background: 'green' }}>
            <Grid container spacing={2}>
                <Grid item xs={11}
                >
                    <List sx={{ overflow: 'clip', bgcolor: 'red', maxHeight: '70vh' }}
                    >
                        {
                            messages.reverse().map((message: any, key: any) =>
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
