
import { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { GameContext } from '../contexts/GameContext';
import { Events } from '../events';
import {handleReceiveUpdatedVotes} from "../sockets/voting.socket";
import {handleOutsiderJoinedGame, handleOutsiderLeftGame, handleJoinedGame, handleClientWantsToJoinGame} from "../sockets/gameJoining.socket";
import {handleGameEnded, handleReceiveGameStateChanged, handleReceiveGameText, handleReceiveFinishedGameStateChanged} from "../sockets/gameStates.socket";
import Player from "../Classes/Player";

//Calls next() with the socket as an argument when is connected
export default function useSocket(serverURL, next) {



    const { setLobbyPlayers,setThemeVotes, playerChosenTheme,setGameID ,
        player,setCanType,setGameText,lobbyPlayers,setPlayer,setGlobalCurrentWordIndex,
        globalCurrentWordIndex,setGameState, setThemeVotingTime, setCountdownTime,setFinishedToLobbyTime
        ,setVictoriousPlayerID, setMistakes,mistakes,setIsPrivateLobby,setIsLobbyLeader
    } = useContext(GameContext);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        console.log("BUGFIX[mistakes]: useSocket: mistakes: ", mistakes);
    }, [mistakes]);

    useEffect(() => {
        console.log("globalCurrentWordIndex: ", globalCurrentWordIndex);
    }, [globalCurrentWordIndex]);
    //useffect for l,obby players
    useEffect(() => {
        console.log("lobby players: ", lobbyPlayers);
    }, [lobbyPlayers]);

    useEffect(() => {
        console.log("useSocket.js: serverURL changed: ", serverURL);
        const socketIo = io(serverURL, {withCredentials: true});
        socketIo.on('connect', () => {
            console.log("conected socket, socketid: ", socketIo.id);
            let player = new Player(socketIo.id, "Client Player");

            setPlayer(player);

            setSocket(socketIo);
            //name is hardcoded for now

            next(socketIo)
        });


        return () => {
            socketIo.disconnect();

        };
    }, [serverURL]);


    const emitEvent = (eventName, data = {}) => {
        console.log("Attempting to emit event: ", eventName, " with data: ", data, " to socket: ", socket);
        if (socket) {
            console.log('emitting event: ', eventName);
            socket.emit(eventName, data);
        }
    };

    const handleClientWantsPlay = (socket, data) => {
        console.log('handleClientWantsPlay');
        emitEvent(Events.CLIENT_WANTS_PLAY)
    }
    // const handleClientWantsCreateGame = (socket, data) => {
    //     console.log('handleClientWantsCreateGame');
    //     emitEvent(Events.CLIENT_WANTS_CREATE_GAME)
    // }
    const handleClientWantsStartGame = (socket, data) => {
        emitEvent(Events.CLIENT_WANTS_START_GAME)
    }

    const handleClientSendsThemeVote = (socket, data) => {
        emitEvent(Events.CLIENT_SENDS_GENRE_VOTE, {theme: playerChosenTheme})
    }

    const handleSendCurrentText = (socket, data) => {
        emitEvent(Events.CLIENT_SENDS_WANTED_CURRENT_TEXT, {index:globalCurrentWordIndex})
        console.log('SENT CLIENT_SENDS_WANTED_CURRENT_TEXT, index: ',globalCurrentWordIndex);
    }
    const handleResetGame = (socket, data) => {
        console.log("RESETING GAME")
        //Refresh players text panel
        if(!data.gameText) {
            throw new Error("No game text provided");
        }
        setGameText(prevText => {
            //Empty string appended to refresh the game text even if it is the same as last
            return data.gameText +'';
        })
        setGlobalCurrentWordIndex(0);
        console.log('BUGFIX[mistakes]: useSocket: setMistakes to empty object')
        setMistakes(prev=>{return {}});

        //reset player progress
        let _player = player;
        _player.updateProgress(0);
        _player.updateWPM(0);
        setPlayer(_player);
        //reset lobby progress
        setLobbyPlayers(prevPlayers => {
            const updatedPlayers = { ...prevPlayers };
            Object.keys(updatedPlayers).forEach((key) => {
                updatedPlayers[key]?.updateProgress(0);
                updatedPlayers[key]?.updateWPM(0);
            });
            return updatedPlayers;
        })


    }
    const handleGameStarted = (socket, data) => {
        //Refresh players text panel
        console.log('RECEIVED SERVER_GAME_STARTED')
        setCanType(true);

    }

    const handleReceivePlayerPositions = (data) => {
        console.log('@@RECEIVED SERVER_SENDS_PLAYER_POSITIONS');
        if(!data.playerPositions) {
            console.log('@@ERROR: player position data is undefined');
            return;
        }
        let _player = player;

        console.log("@@data.playerPositions: ", data.playerPositions);
        console.log("@@player: ", _player);

        //receiving = { socketID: { progress: 0, wpm: 0, percentageProgress: 0  } }
        let updatedPositions = data.playerPositions

        //updating lobby players
        setLobbyPlayers(prevPlayers => {
            const updatedPlayers = { ...prevPlayers };
            Object.keys(updatedPositions).forEach((key) => {
                if(key === _player.socketID) return;
                console.log("@@key: ", key);
                updatedPlayers[key]?.updateProgress(updatedPositions[key].progress);
                updatedPlayers[key]?.updateWPM(updatedPositions[key].wpm);
            });
            return updatedPlayers;
        });
        //updating client player
        _player.updateProgress(updatedPositions[_player.socketID].progress);
        _player.updateWPM(updatedPositions[_player.socketID].wpm);
        console.log("@@_player after new scores: ", _player)
        setPlayer(_player);
        console.log("@@_player after new scores: ", _player)



    }



    useEffect(() => {
        if (socket) {
            socket.on(Events.SERVER_JOINED_GAME, (data) => {
                handleJoinedGame(socket,data,setGameID,setLobbyPlayers,
                    setGameState,setThemeVotingTime,
                    setCountdownTime, setFinishedToLobbyTime,setIsPrivateLobby,setIsLobbyLeader);
                // Show our real username (or guest name) instead of a placeholder
                if (data.you?.name && player) {
                    player.name = data.you.name;
                    setPlayer(player);
                }
            });
            socket.on(Events.SERVER_RESET_GAME, (data) => {
                console.log('RECEIVED SERVER_RESET_GAME');
                handleResetGame(socket,data);
            });
            socket.on(Events.SERVER_WANTS_CURRENT_TEXT, () => {
                console.log('RECEIVED SERVER_WANTS_CURRENT_TEXT');
                handleSendCurrentText(socket);
            });
            socket.on(Events.SERVER_SENDS_PLAYER_POSITIONS, (data) => {
                handleReceivePlayerPositions(data)
            });
            socket.on(Events.SERVER_GAME_STARTED, (data) => {
                handleGameStarted(socket,data);
            });
            socket.on(Events.SERVER_GAME_STATE_CHANGED, (data) => {
                console.log('BUGFIX[mistakes]:useSocket:onServerGameStateChanged, mistakes: ',mistakes);
                handleReceiveGameStateChanged(socket,data, setGameState);
                handleReceiveFinishedGameStateChanged(socket,data,emitEvent,mistakes);
            })
            socket.on(Events.SERVER_GAME_ENDED, (data) => {
                console.log('RECEIVED SERVER_GAME_ENDED');
                handleGameEnded(socket,data,setCanType,setVictoriousPlayerID);
            });
            socket.on(Events.SERVER_GENRE_VOTES_UPDATED, (data) => {
                handleReceiveUpdatedVotes(data.themeVotes, setThemeVotes)
            });
            socket.on(Events.SERVER_PLAYER_JOINED, (data) => {
                handleOutsiderJoinedGame(socket,data,lobbyPlayers,setLobbyPlayers);
            });
            socket.on(Events.SERVER_PLAYER_LEFT, (data) => {
                handleOutsiderLeftGame(socket,data, lobbyPlayers,setLobbyPlayers);
            });
            socket.on(Events.SERVER_SENDS_GAME_TEXT, (data) => {
                handleReceiveGameText(socket,data,setGameText)
            })
            return () => {
                socket.off(Events.SERVER_JOINED_GAME);
                socket.off(Events.SERVER_WANTS_CURRENT_TEXT);
                socket.off(Events.SERVER_SENDS_PLAYER_POSITIONS);
                socket.off(Events.SERVER_GAME_STARTED);
                socket.off(Events.SERVER_GAME_ENDED);
                socket.off(Events.SERVER_GENRE_VOTES_UPDATED);
                socket.off(Events.SERVER_PLAYER_JOINED);
                socket.off(Events.SERVER_PLAYER_LEFT);
                socket.off(Events.SERVER_RESET_GAME);
                socket.off(Events.SERVER_SENDS_GAME_TEXT);
                socket.off(Events.SERVER_GAME_STATE_CHANGED);
            };
        }
    }, [socket, globalCurrentWordIndex, mistakes,setMistakes, player]);

    return { socket, emitEvent, handleClientWantsPlay
        , handleClientWantsStartGame
    };
}