import { Box, Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Image from 'next/image';
import { ConnectedUser } from '../utils/interfaces/ConnectedUser';

export default function Dancefloor(props: { users: ConnectedUser[] }) {
    const slots = 20
    const slotSqrt = Math.floor(Math.sqrt(slots))

    return (
        <Container maxWidth={false} sx={{ mt: 10, background: 'green' }}>
            <Grid container spacing={5} columns={slotSqrt} alignItems="center">
                {
                    [...Array(slotSqrt * slotSqrt + slotSqrt)].map((_, index: number) =>
                        <Grid item key={`${index}-grid`} xs={1}
                            display="flex"
                            alignItems="center"
                            alignContent='center'
                            justifyContent="center"
                        >
                            <Box
                                key={`${index}-box`}
                                sx={{ background: 'red', width: "25%", opacity: props.users[index] ? 1 : 0 }} // Why 25 ? 🤷‍♂️
                            >
                                <Typography key={`${index}-typo`} align="center" noWrap={true}>{props.users[index]?.name}</Typography>
                                <Box key={`${index}-image-box`} sx={{ background: 'blue' }}>
                                    <Image key={`${index}-image`} alt="user-body" src="/stickman.png" width="1200" height="1694" objectFit='contain' />
                                </Box>
                            </Box>
                        </Grid >
                    )
                }
            </Grid >
        </ Container >
    );
}
