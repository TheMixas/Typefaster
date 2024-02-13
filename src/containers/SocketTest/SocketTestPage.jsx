import React, {useContext, useEffect} from 'react';
import io from 'socket.io-client';
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import {Events} from "../../events";
import {GameContext} from "../../contexts/GameContext";
import useSocket from "../../hooks/useSocket";
import MyEditor from "../../components/MyEditor";
import TextSummary from "../../components/TextSummary";
import TextPanel from "../../components/TextPanel";
import ProgressBars from "../../components/ProgressBars";
import LobbyDashboard from "../../components/LobbyDashboard";
import VotingBoard from "../../components/VotingBoard";
import SplashTexts from "../../components/SplashTexts";
import EncryptButton from "../../components/buttons/EncryptButton";
import "./../../styles/background-colors.scss"

// const socket = io('http://localhost:5000')// replace with your server address

export const SocketTestPage = () => {
    const {socket,emitEvent,handleClientWantsPlay,
        handleClientWantsCreateGame,handleClientWantsStartGame
    } = useSocket('http://localhost:5000')
    const {testChangeLobbyPlayerProgress,lobbyPlayers,isPrivateLobby,gameState,isLobbyLeader} = useContext(GameContext)

    let dashboardItems = [
        //If is public lobby, or isLeader, show the voting board
        (!isPrivateLobby || isLobbyLeader) && <VotingBoard socket={socket}/>
    ]


    return (
        <div>
            <button onClick={() => {
                handleClientWantsPlay()
            }}>Client Wants Play
            </button>
            <button onClick={() => {
                handleClientWantsCreateGame()
            }}>Client Wants Create Game
            </button>
            <button onClick={() => {
                handleClientWantsStartGame()
            }}>Client Wants Start Game
            </button>
            <button onClick={() => emitEvent('sendRequestedCurrentText', {text: 'test text'})}>Send Requested Current
                Text
            </button>
            {/* Add more buttons for other events as needed */}
            <h1>LOGIN</h1>
            <LoginForm/>
            <h1>REGISTER</h1>
            <RegisterForm/>
            <h1>TEXT FORM</h1>
            <h1 style={{color: "GREEN"}}>{socket?.id}</h1>
            <h1 style={{color: "GREEN"}}>{isPrivateLobby ? 'Private Game' : 'Public Game'}</h1>

            <button onClick={
                () => {
                    testChangeLobbyPlayerProgress("gustas", 0.5)
                }
            }>CHANGE SCORE
            </button>
            <button onClick={
                () => {
                    testChangeLobbyPlayerProgress("socket1", 1)
                }
            }>CHANGE SCORE 2
            </button>
            <div style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
                <SplashTexts title={"Title"} subtitle={"Subtitle"}/>
                <div className="" style={{width: "100%", display: 'flex'}}>
                    <ProgressBars/>
                    <LobbyDashboard items={dashboardItems}/>
                </div>
                {
                    //Show the start button only if the game is in the waiting state
                    gameState === 'WaitingState' ? <EncryptButton
                        _onClick={handleClientWantsStartGame}
                        customClass={'secondary-color-light-bg'}
                        buttonText={"START"}
                    /> : null
                }


            </div>
            <TextPanel/>

        </div>
    );
};

