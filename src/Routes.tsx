import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";
import Game from './routes/game';
import Home from './routes/home';
import Lobby from './routes/lobby';
import Profile from './routes/profile';
import SignIn from './routes/signIn';
import SignUp from './routes/signUp';

const Routes = () => (
    <BrowserRouter>
        <RouterRoutes>
            <Route path="/" element={<Home />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/game" element={<Game />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route
                path="*"
                element={
                    <main style={{ padding: '1rem' }}>
                        <p>There's nothing here!</p>
                    </main>
                }
            />
        </RouterRoutes>
    </BrowserRouter>

);

export default Routes;
