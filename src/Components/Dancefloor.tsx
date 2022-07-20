import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Dancer from './Dancer';

export default function Dancefloor(props: any) {
    return (
        <Container component="main" maxWidth="lg" sx={{
            bgcolor: '#cfe8fc', width: '100vw',
            height: '500px'
        }}>
            <Box sx={{ width: 'auto' }}>
                {
                    Object.keys(props.users).map((userId, key) =>
                        <Dancer user={props.users[userId]} key={key} />
                    )
                }
            </Box>
        </Container>
    );
}