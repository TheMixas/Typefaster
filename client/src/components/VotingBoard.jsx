import './SCSS/voting_board.scss'
import React, {useContext, useEffect, useState} from "react";
import {GameContext} from "../contexts/GameContext";
import ThemeVoteButton from "./ThemeVoteButton";

export default function VotingBoard({socket=null}){
    const {textThemes, isLobbyLeader,isPrivateLobby} = useContext(GameContext)

    //set the header based on lobby leader and private lobby
    const [header, setHeader] = useState("")
    useEffect(() => {
        if(isPrivateLobby && isLobbyLeader){
            setHeader("Choose!")
        }else if(!isPrivateLobby){
            setHeader("Vote!")
        }else{
            //For now this case happens in a private lobby when you are not the leader
            setHeader("Genres")
        }
    }, []);
    return(
        <div className="voting-board">
            <span className="white-tall voting-board--header ">{header}</span>
            {
                textThemes.map((name,index)=>{
                    return <ThemeVoteButton key={index} themeName={name} socket={socket}/>
                })
            }
        </div>
    )
}