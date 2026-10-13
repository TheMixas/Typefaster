import {IsNullOrUndefined, IsNumber} from "../utils/validation-utils";

export default class Player {
    constructor(socketID, name,progress = 0,wpm = 0, procentageProgress = 0) {
        if(IsNullOrUndefined(socketID)){
            throw new Error("SocketID cannot be null or undefined");
        }
        if(IsNullOrUndefined(name)){
            throw new Error("Name cannot be null or undefined");
        }
        if(!IsNumber(progress)){
            throw new Error("Progress must be a number");
        }
        if(!IsNumber(wpm)){
            throw new Error("WPM must be a number");
        }
        this.socketID = socketID;
        this.name = name;
        this.progress = progress;
        this.procentageProgress = 0;
        this.wpm = wpm;
    }
    updateProgress(progress){
        if(IsNullOrUndefined(progress)){
            throw new Error("Progress cannot be null or undefined");
        }
        if(!IsNumber(progress)){
            throw new Error("Progress must be a number");
        }
        this.progress = progress;
    }

    updateWPM(wpm){
        if(IsNullOrUndefined(wpm)){
            return console.log("WPM is null, not updating");
        }
        if(!IsNumber(wpm)){
            throw new Error("WPM must be a number");
        }
        this.wpm = wpm;
    }


}