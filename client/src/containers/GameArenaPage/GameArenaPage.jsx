import {useParams, useNavigate} from "react-router-dom";
import useSocket from "../../hooks/useSocket";
import React, {useContext, useEffect, useState} from "react";
import {handleClientWantsToJoinGame, handleClientWantsToCreateGame,handleClientWantsToQuickPlay} from "../../sockets/gameJoining.socket";
import {GameContext} from "../../contexts/GameContext";
import VotingBoard from "../../components/VotingBoard";
import './SCSS/game_arena_page.scss'
import SplashTexts from "../../components/SplashTexts";
import ProgressBars from "../../components/ProgressBars";
import LobbyDashboard from "../../components/LobbyDashboard";
import EncryptButton from "../../components/buttons/EncryptButton";
import TextPanel from "../../components/TextPanel";
import './../../styles/typography.scss'
import CopyGameLink from "../PlayAreaPage/CopyGameLink";



export default function GameaArenaPage({}) {
    //game types : quick, custom, createCustom
    const {socket,emitEvent,handleClientWantsPlay,handleClientWantsStartGame
    } = useSocket('http://localhost:5000', (socket)=>{
        switch (gameType) {
            case 'quick':
                handleClientWantsToQuickPlay(socket)
                break;
            case 'custom':
                //if no game id, return 404
                console.log("Joining custoom game with ID: ", gameID)
                if(!gameID) {
                    navigate('/404')
                    return
                }
                console.log("Joining game with ID: ", gameID)
                handleClientWantsToJoinGame(socket, gameID)
                break;
            case 'createCustom':
                handleClientWantsToCreateGame(socket)
                break;
            default:
                navigate('/404')
        }
    })
    const {testChangeLobbyPlayerProgress,lobbyPlayers,isPrivateLobby,gameState,isLobbyLeader, gameID} = useContext(GameContext)

    useEffect(() => {
        console.log("GameArenaPage.jsx: Game ID changed to: ", gameID)
    }, [gameID]);



    const navigate = useNavigate()
    let {gameType} = useParams()

    //get game id
    console.log("Game type: ", gameType)



    const showVoteBoard = () => {
        if(!isLobbyLeader && isPrivateLobby)return false
        return true
    }
    //The dashboard can be different based on the game type and player role.
    //For now, its only used for voting board, btu can be used to store thingss like stats and other game info
    let dashboardItems = [
        //If is public lobby, or isLeader, show the voting board
        showVoteBoard() && <VotingBoard socket={socket}/>
    ]
    const getStartHelpText = () => {
        switch (gameType) {
            case 'quick':
                return "Can`t wait to start the game? Click to start a single-player match!"
                break;
            case 'custom':
                return "Waiting for the game leader to start the game..."
                break;
            case 'createCustom':
                return "Start the game when you are ready..."
                break;
        }

    }
    const[startHelpText, setStartHelpText] = useState(getStartHelpText)


    const shouldShowStartButton = () => {
        if(gameState !== 'WaitingState') return false
        switch (gameType) {
            case 'quick':
                return true
                break;
            case 'custom':
                return isLobbyLeader
                break;
            case 'createCustom':
                return true
                break;
        }
    }
    const shouldShowCopyLink = () => {
        if(gameState !== 'WaitingState') return false
        return isPrivateLobby
    }

    return(
        <div className={"game-arena-page"}>
            <div style={{display: 'flex', flexDirection: "column", alignItems: "center", width:'100%'}}>
                {
                    //Show UID if private game
                    shouldShowCopyLink() && <CopyGameLink gameID={gameID}/>
                }
                <SplashTexts title={"Title"} subtitle={"Subtitle"}/>
                <div className="" style={{width: "100%", display: 'flex', alignItems:"center", justifyContent:'center'}}>
                    <ProgressBars/>
                    <LobbyDashboard items={dashboardItems}/>
                </div>
                {
                    //Show the start button if appropriate
                    shouldShowStartButton()  ? <EncryptButton
                        _onClick={handleClientWantsStartGame}
                        customClass={'secondary-color-light-bg'}
                        buttonText={"START"}
                    /> : null

                }
                {
                    //Help text
                    gameState === 'WaitingState' && <p className={'italic gray'}> {startHelpText}</p>
                }


            </div>
            <TextPanel/>
        </div>
    )
}