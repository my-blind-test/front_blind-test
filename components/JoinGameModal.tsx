import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Alert, Grid, Modal } from '@mui/material';
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

export default function JoinGameModal(props: { open: boolean, onModalClose: () => void, onJoinGame: Function }) {
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const response = await props.onJoinGame(data.get('password'))

        if (!response) {
            props.onModalClose()
        } else if (response.status === 'OK') {
            props.onModalClose()
        } else {
            setErrorMessage(response.content)
        }
    };

    return (
        <Modal
            open={props.open}
            onClose={props.onModalClose}
            aria-labelledby="Join game"
        >
            <Box component="form" noValidate onSubmit={handleSubmit} sx={style}>
                <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 5 }}
                >
                    Join game
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