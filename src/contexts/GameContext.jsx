import React, {createContext, useState} from 'react';
import Player from "../Classes/Player";

export const GameContext = createContext()

export const GameContextProvider = ({children}) => {


    const [gameID, setGameID] = useState(undefined)
    // const [playerText, setPlayerText] = useState("Kukub")
    const [gameState, setGameState] = useState('WaitingState')
    const [gameText, setGameText] = useState(null)
    const [canType, setCanType] = useState(false)
    const [globalCurrentWordIndex, setGlobalCurrentWordIndex] = useState(0)

    //fetch this from the server
    const [textThemes, setTextThemes] = useState(["Default", "Psychology", 'Javascript'])

    //SET THIS WHEN WE VOTE FOR A THEME
    const [playerChosenTheme, setPlayerChosenTheme] = useState('Default') // genre
    const [themeVotes, setThemeVotes] = useState({}) // {theme1: 0, theme2: 0, theme3: 0}
    //an array of objects, each object contains a player's name and their progress, sorted by progress
    // const [lobbyProgress, setLobbyProgress] = useState(null)

    //Player mistakes, an object which keys represent the word and the value is an array of mistakes for the word
    //Populated by the editor, filled by mistyped chars
    //Structure:{word:mistakes['a','b','c','"', ';']}
    const [mistakes, setMistakes] = useState({word:['z']})

    //an object of players, socketid as key, Player object as value
    const [lobbyPlayers, setLobbyPlayers] = useState({})

    //an object of our own player
    //set this when we join a lobby
    const [player, setPlayer] = useState()

    //Lobby specifics
    const [isLobbyLeader, setIsLobbyLeader] = useState(false)
    const [isPrivateLobby, setIsPrivateLobby] = useState(false)

    //Countdowns
    const [themeVotingTime, setThemeVotingTime] = useState(10)
    const [countdownTime, setCountdownTime] = useState(3)
    const [finishedToLobbyTime, setFinishedToLobbyTime] = useState(5)

    //Game specifics
    const [victoriousPlayerID, setVictoriousPlayerID] = useState(false)

    //Before lobby join


    const testChangeLobbyPlayerProgress = (socketID,progress) => {
        let newLobbyPlayers = {...lobbyPlayers}
        newLobbyPlayers[socketID].progress = progress
        setLobbyPlayers(newLobbyPlayers)
    }

    return(
        <GameContext.Provider value={{
            gameID, setGameID,
            gameState, setGameState,
            gameText, setGameText,
            globalCurrentWordIndex, setGlobalCurrentWordIndex,
            canType, setCanType,
            lobbyPlayers, setLobbyPlayers
            ,player, setPlayer,
            testChangeLobbyPlayerProgress,
            themeVotes, setThemeVotes,
            playerChosenTheme, setPlayerChosenTheme,
            textThemes, setTextThemes,
            isLobbyLeader, setIsLobbyLeader,
            isPrivateLobby, setIsPrivateLobby,
            themeVotingTime, setThemeVotingTime,
            countdownTime, setCountdownTime,
            finishedToLobbyTime, setFinishedToLobbyTime,
            victoriousPlayerID, setVictoriousPlayerID,
            mistakes, setMistakes
        }}>
            {children}
        </GameContext.Provider>
    )
}