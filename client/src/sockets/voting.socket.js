//This will contain handle functions for voting socket events
import {Events} from "../events";
import {notifyError} from "../utils/toast-utils";

export const handleVote = (socket, theme, setChosenTheme) => {
    const cb = (response) => {
        console.log("Response from server: ", response);
        if(response.success){
            setChosenTheme(theme);
        }else{
            console.log("Error when voting for genre: ", response.error);
            notifyError(response.error);
        }
    }
    if(!socket){
        console.log("No socket");
        return;
    }
    socket.emit(Events.CLIENT_SENDS_GENRE_VOTE, theme, cb);
}

export const handleReceiveUpdatedVotes = (themeVotes, setTheVotes) => {
    console.log("Received updated votes: ", themeVotes);
    if(!themeVotes){
        console.log("No theme votes");
        return;
    }
    if(!setTheVotes){
        console.log("No setTheVotes");
        return;
    }

    setTheVotes(themeVotes);
}