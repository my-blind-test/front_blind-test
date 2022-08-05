import { Box, Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Image from 'next/image';

export default function Dancefloor(props: any) {
    const slotSqrt = Math.floor(Math.sqrt(20))

    return (
        <Container maxWidth={false} sx={{ mt: 10, background: 'green' }}>
            <Grid container spacing={5} columns={slotSqrt + 1} alignItems="center">
                {
                    [...Array(slotSqrt * slotSqrt + slotSqrt)].map((_, index) =>
                        <Grid item key={`${index}-grid`} xs={1}
                            display="flex"
                            alignItems="center"
                            alignContent='center'
                            justifyContent="center"
                        >
                            <Box
                                key={`${index}-box`}
                                sx={{ background: 'red', width: "40%" }} // Why 40 ? 🤷‍♂️
                            >
                                <Typography key={`${index}-typo`} align="center" noWrap={true}>Hello</Typography>
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
