import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useCurrentUserContext } from '../context/CurrentUserContext';
import Link from 'next/link';
import { removeStoredAccessToken } from '../utils/accessToken';

export default function HomeBar() {
    const { currentUser, fetchCurrentUser } = useCurrentUserContext()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ m: 1, flexGrow: 1 }}>
                        <Link href="/">
                            BlindTest
                        </Link>
                    </Typography>


                    {currentUser ?
                        <Link href="/">
                            <Button color="inherit" onClick={() => {
                                removeStoredAccessToken()
                                fetchCurrentUser?.()
                            }}>
                                Log out
                            </Button>
                        </Link>
                        :
                        <div>
                            <Link href="/register">
                                <Button color="inherit">
                                    Register
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button color="inherit">
                                    Login
                                </Button>
                            </Link>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
