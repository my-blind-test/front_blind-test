import { Box, Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Image from 'next/image';
import { useCurrentUserContext } from '../context/CurrentUserContext';

export default function UserPreview(props: any) {
    const { currentUser } = useCurrentUserContext()

    return (
        <Container sx={{ mt: 10, backgroundColor: 'green' }}>
            <Grid container direction="column" alignItems="center" sx={{}}>
                <Grid item>
                    <Typography variant="h4">
                        {currentUser.name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Box sx={{ background: 'blue' }}>
                        <Image alt="user-body" src="/stickman.png" width="1200" height="1694" objectFit='contain' />
                    </Box>
                </Grid>
            </Grid>
        </Container >
    );
}