import { Box, Container, Grid, Typography } from '@mui/material';
import GameList from '../components/GameList';
import UserPreview from '../components/UserPreview';

export default function Lobby() {
    return (
        <Container maxWidth={false} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} direction="row" alignItems="flex-start">
                <Grid item xs={12} md={6} lg={4}>
                    <GameList />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <UserPreview />
                </Grid>
                <Grid item xs={12} md={12} lg={4}>
                    <Box
                        sx={{
                            border: 2   ,
                            borderRadius: '10%',
                            width: '80%',
                            height: '700px',
                        }}
                    >
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}