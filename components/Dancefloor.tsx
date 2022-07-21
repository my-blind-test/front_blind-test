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
                    props.users.map((user: any, key: any) =>
                        <Dancer user={user} key={key} />
                    )
                }
            </Box>
        </Container>
    );
}