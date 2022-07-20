import { Alert, Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import { storeAccessToken } from '../utils/accessToken';
import api from "../utils/api"
import { useCurrentUserContext } from '../context/CurrentUserContext';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
    const [errorMessage, setErrorMessage] = useState("");
    const { fetchCurrentUser } = useCurrentUserContext()

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const response = await api.post("/auth/login",
            {
                username: data.get('username'),
                password: data.get('password')
            })
            .catch((err) => {
                if (err.status === 401) {
                    setErrorMessage("Couldn't sign in, please check the credentials.")
                } else {
                    setErrorMessage("An error occured, please try again later.")
                }
            })

        if (response) {
            setErrorMessage("")
            storeAccessToken(response.access_token)
            fetchCurrentUser?.()
            router.push("/");
        }
    };

    return (
        <div className={styles.container}>
            <Container component="main" maxWidth="xs">
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
                                <Link href="/register">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>

        </div>
    )
}