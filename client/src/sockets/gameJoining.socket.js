import Player from "../Classes/Player";
import {Events} from "./../events";


export const handleJoinedGame= (socket,data,setGameID,setLobbyPlayers,
                                setGameState,setThemeVotingTime,setCountdownTime,
                                setFinishedToLobbyTime,setIsPrivateLobby, setIsLobbyLeader)=>{
    console.log('RECEIVED SERVER_JOINED_GAME');
    console.log('RECEIVED SERVER_JOINED_GAME data: ', data);

    if(!data.gameUID){
        throw new Error("No gameUID provided");
    }
    if(!data.players){
        throw new Error("No players provided");
    }
    if(!data.state)
    {
        throw new Error("No state provided");
    }
    if(!data.themeVotingTime)
    {
        throw new Error("No themeVotingTime provided");
    }
    if(!data.countdownTime)
    {
        throw new Error("No countdownTime provided");
    }
    if(!data.finishedToLobbyTime)
    {
        throw new Error("No finishedToLobbyTime provided");
    }
    if(data.isPrivateLobby === null){
        throw new Error("No isPrivateLobby provided");
    }
    if(data.isLobbyLeader === null){
        throw new Error("No isLobbyLeader provided");
    }

    console.log("Received server joined game data: ", data);

    setGameID(data.gameUID);
    setGameState(data.state);
    setThemeVotingTime(data.themeVotingTime);
    setCountdownTime(data.countdownTime);
    setFinishedToLobbyTime(data.finishedToLobbyTime);
    setIsPrivateLobby(data.isPrivateLobby);
    setIsLobbyLeader(data.isLobbyLeader);



    setLobbyPlayers(prevState => {
        let _lobbyPlayers = {...prevState};
        data.players.forEach(player => {
            _lobbyPlayers[player.id] = new Player(player.id,player.name);
        });
        return _lobbyPlayers;
    })
}

export const handleOutsiderJoinedGame = (socket, data, lobbyPlayers,setLobbyPlayers) => {
    console.log('RECEIVED SERVER_OUTSIDER_JOINED_GAME');
    if(!data.player) {
        console.log('ERROR: no player data');
        return;
    }

    //add player to lobby players
    setLobbyPlayers(prevState => {
        let _lobbyPlayers = {...prevState};
        _lobbyPlayers[data.player.id] = new Player(data.player.id,data.player.name);
        return _lobbyPlayers;
    });

}
export const handleOutsiderLeftGame = (socket, data, lobbyPlayers,setLobbyPlayers) => {
    console.log('RECEIVED SERVER_OUTSIDER_LEFT_GAME');
    if(!data.socketID) {
        console.log('ERROR: no player socket id data');
        return;
    }
    console.log('data.player: ', data.socketID);
    //remove player from lobby players
    //if game state
    setLobbyPlayers(prevState => {
        let _lobbyPlayers = {...prevState};
        delete _lobbyPlayers[data.socketID];
        return _lobbyPlayers;
    });


}

export const handleClientWantsToJoinGame = (socket, gameID) => {
    if(!socket){
        return new Error("No socket provided");
    }

    console.log('EMITTING CLIENT_WANTS_TO_JOIN_GAME');
    socket.emit(Events.CLIENT_WANTS_JOIN_GAME, {gameUID: gameID});
}

export const handleClientWantsToCreateGame = (socket) => {
    if(!socket){
        return new Error("No socket provided");
    }
    console.log('EMITTING CLIENT_WANTS_TO_JOIN_GAME');

    socket.emit(Events.CLIENT_WANTS_CREATE_GAME);
}
export const handleClientWantsToQuickPlay = (socket) => {
if(!socket){
        return new Error("No socket provided");
    }
    console.log('EMITTING CLIENT_WANTS_TO_QUICK_PLAY');

    socket.emit(Events.CLIENT_WANTS_PLAY);
}