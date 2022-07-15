import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useCurrentUser } from '../utils/CurrentUserContext';

export default function HomeBar() {
    const { currentUser } = useCurrentUser()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <Avatar alt="Blind test" src={require("../static/images/microphone.png")} />
                    </Link>

                    <Typography variant="h6" component="div" sx={{ m: 1, flexGrow: 1 }}>
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            BlindTest
                        </Link>
                    </Typography>


                    {currentUser ?
                        <Link to="/profile" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            {currentUser.name}
                        </Link>
                        :
                        <div>
                            <Link to="/register" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                <Button color="inherit">
                                    Register
                                </Button>
                            </Link>
                            <Link to="/login" style={{ color: 'inherit', textDecoration: 'inherit' }}>
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
