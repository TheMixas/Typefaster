// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {SocketTestPage} from "./containers/SocketTest/SocketTestPage";
import {GameContextProvider} from "./contexts/GameContext";
import HomePage from "./containers/HomePage/HomePage";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import {ToastContainer} from "react-toastify";
import PlayAreaPage from "./containers/PlayAreaPage/PlayAreaPage";
import GameaArenaPage from "./containers/GameArenaPage/GameArenaPage";
import JoinFriendRedirect from "./containers/JoinFriendRedirect/JoinFriendRedirect";
import Profile from "./containers/Profile/Profile";
import {AuthModalContext, AuthModalContextProvider} from "./contexts/AuthModalContext";
import AuthModal from "./Modals/AuthModal";

function App() {
    // const socket = useSocket('http://localhost:5000'); // replace with your server URL

    // You can now use the `socket` instance in your component

    return (
        <Router>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <AuthModalContextProvider>
            <GameContextProvider>
            <Routes>
                <Route path="/" element={<><AuthModal/><NavBar/><HomePage/><Footer/></>} />
                <Route path="/profile" element={<><AuthModal/><NavBar/><Profile/><Footer/></>} />
                <Route path="/profile/:username" element={<><AuthModal/><NavBar/><Profile/><Footer/></>} />

                <Route path="/about" element={<><AuthModal/>about</>} />
                    <Route path="/join-friend/:roomCode" element={<JoinFriendRedirect/>} />
                    <Route path="/battlefield/:gameType" element={<><AuthModal/><NavBar/><GameaArenaPage/></>} />
                    {/*<Route path="/test" element={*/}
                    {/*    <GameContextProvider>*/}
                    {/*        <SocketTestPage/>*/}
                    {/*    </GameContextProvider>*/}
                    {/*} />*/}
                    <Route path={"/playarea"} element={

                        <>
                            <AuthModal/>
                            <NavBar/>
                                    <PlayAreaPage/>
                            <Footer/>
                        </>}
                    />
            </Routes>
            </GameContextProvider>
            </AuthModalContextProvider>


        </Router>
    );
}

export default App;