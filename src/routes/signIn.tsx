import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Alert } from '@mui/material';
import api from '../utils/api';
import { storeAccessToken } from '../utils/accessToken';
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from '../utils/CurrentUserContext';

const theme = createTheme();

export default function SignIn() {
    const [errorMessage, setErrorMessage] = React.useState("");
    const { fetchCurrentUser } = useCurrentUser()
    let navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const response = await api.post("/auth/login",
            {
                username: data.get('username'),
                password: data.get('password')
            })
            .catch((err) => {
                if (err.statusCode === 401) {
                    setErrorMessage("Couldn't sign in, please check the credentials.")
                } else {
                    setErrorMessage("An error occured, please try again later.")
                }
            })

        if (response) {
            setErrorMessage("")
            storeAccessToken(response.access_token)
            fetchCurrentUser()
            navigate("/");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="password"
                                />
                            </Grid>
                        </Grid>
                        {errorMessage ?
                            <Alert variant="outlined" severity="error" sx={{ mt: 2, mb: 2, display: 'line' }} >
                                {errorMessage}
                            </Alert>
                            : null
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/register" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}