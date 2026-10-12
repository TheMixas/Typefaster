import {notifyError} from "../utils/toast-utils";
import {Events} from "../events";
/*
    * Socket event handlers for game states.
    * @module sockets/gameStates
 */

/**
 * Handles the SERVER_GAME_STATE_CHANGED event.
 * @param socket
 * @param data
 * @param setState
 */
export const handleReceiveGameStateChanged = (socket, data=null,setState) => {
    if(!socket){
        throw new Error("No socket provided");
    }
    if(!data.state){
        throw new Error("No state provided");
    }
    if(!setState){
        throw new Error("No setState provided");
    }
    console.log('RECEIVED SERVER_GAME_STATE_CHANGED: ' ,data.state);
    setState(data.state);
}
export const handleReceiveFinishedGameStateChanged = (socket, data=null,emitEvent,mistakes) => {
    if(!socket){
        throw new Error("No socket provided");
    }
    if(!data.state){
        throw new Error("No state provided");
    }
    if(data.state !== 'FinishedState'){
        return;
    }
    if(!mistakes){
        throw new Error("No mistakes provided");
    }
    console.log('BUGFIX[mistakes]:gameStates.socket.js:mitakes 1: ',mistakes);
    //only handle finished state
    emitEvent(Events.CLIENT_SENDS_MISTAKE_ARRAY,mistakes);
    console.log('BUGFIX[mistakes]: gameStates.socket.js: Received gamestate finished and emitted mistakes array to server: ', mistakes);
    //respond with an array of player`s mistakes

}
//
export const handleGameEnded = (socket, data, setCanType,setVictoriousPlayerID) => {
    console.log('RECEIVED SERVER_GAME_STATE_CHANGED: finished ( game eneded)')

    console.log("RECEIVED SERVER_GAME_STATE_CHANGED data: ", data)
    console.log("RECEIVED SERVER_GAME_STATE_CHANGED data.playerWonID: ", data.playerWonID)
    if(!socket){
        throw new Error("No socket provided");
    }
    if(!data){
        throw new Error("No data provided");
    }
    if(data.playerWonID===undefined){
        throw new Error("No playerWonID provided");
    }


    //Refresh players text panel
    setCanType(false);
    setVictoriousPlayerID(data.playerWonID);
}

export const handleReceiveGameText=(socket, data, setGameText)=> {
    console.log('RECEIVED SERVER_SENDS_GAME_TEXT');
    if(!data.gameText) {
        throw new Error("No game text provided");
    }
    setGameText(prevText => {
        //Empty string appended to refresh the game text even if it is the same as last
        return data.gameText +'';
    })
}