import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert, Modal } from '@mui/material';
import { useState } from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function CreateGameModal(props: { open: boolean, onModalClose: () => void, onCreateGame: Function }) {
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const response = await props.onCreateGame(data.get('name'), data.get('password'), data.get('playlistUrl'))

        if (response.status === 'OK') {
            props.onModalClose()
        } else {
            setErrorMessage(response.content)
        }
    };

    return (
        <Modal
            open={props.open}
            onClose={props.onModalClose}
            aria-labelledby="Create game"
        >
            <Box component="form" noValidate onSubmit={handleSubmit} sx={style}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="playlistUrl"
                            label="Url"
                            id="playlistUrl"
                            defaultValue="https://open.spotify.com/playlist/5vbfBI3A8OtZQzSihKjqai?si=_IAl784ZQF6punIrewBd-A"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 5 }}
                >
                    Create game
                </Button>

                {errorMessage &&
                    <Alert variant="outlined" severity="error" sx={{ mt: 2, display: 'line' }} >
                        {errorMessage}
                    </Alert>
                }
            </Box>
        </Modal>
    );
}